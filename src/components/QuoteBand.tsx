import { useCallback, useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { styles } from "../theme/style";

interface Quote {
  quote: string;
  author: string;
}

// The quotes API intersects the categories it is given, so one theme is drawn
// per request; across visits the band draws from all five.
const QUOTE_CATEGORIES = ["wisdom", "life", "love", "happiness", "nature"];

const API_URL = "https://api.api-ninjas.com/v2/randomquotes";
const API_KEY = process.env.EXPO_PUBLIC_API_NINJAS_KEY?.trim();
const REQUEST_TIMEOUT_MS = 8000;

// Shown when the API cannot answer: no key, offline, or out of quota.
const FALLBACK_QUOTES: Quote[] = [
  {
    quote: "In every walk with nature one receives far more than he seeks.",
    author: "John Muir",
  },
  { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
  { quote: "The best way out is always through.", author: "Robert Frost" },
];

if (__DEV__ && !API_KEY) {
  console.warn(
    "EXPO_PUBLIC_API_NINJAS_KEY is not set — the quote band is showing its bundled quotes.",
  );
}

function pick<T>(list: readonly T[], exclude?: T): T {
  const pool =
    list.length > 1 && exclude !== undefined
      ? list.filter((item) => item !== exclude)
      : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

async function requestQuote(signal: AbortSignal): Promise<Quote | null> {
  if (!API_KEY) return null;
  const category = pick(QUOTE_CATEGORIES);
  const response = await fetch(`${API_URL}?categories=${category}`, {
    headers: { "X-Api-Key": API_KEY },
    signal,
  });
  if (!response.ok) return null;
  const data: unknown = await response.json();
  const first = Array.isArray(data) ? data[0] : null;
  if (!first || typeof first.quote !== "string") return null;
  const quote = first.quote.trim();
  if (!quote) return null;
  return {
    quote,
    author: typeof first.author === "string" ? first.author.trim() : "",
  };
}

export default function QuoteBand() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [quote, setQuote] = useState<Quote | null>(() =>
    API_KEY ? null : pick(FALLBACK_QUOTES),
  );
  const [pending, setPending] = useState(Boolean(API_KEY));
  const [reveal] = useState(() => new Animated.Value(0));
  const [reduceMotion, setReduceMotion] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const startRequest = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    return {
      controller,
      result: requestQuote(controller.signal)
        .catch(() => null)
        .finally(() => clearTimeout(timeout)),
    };
  }, []);

  const applyResult = useCallback(
    (controller: AbortController, next: Quote | null) => {
      // A newer request superseded this one.
      if (abortRef.current !== controller) return;
      setPending(false);
      setQuote((current) => next ?? current ?? FALLBACK_QUOTES[0]);
    },
    [],
  );

  const load = useCallback(() => {
    if (!API_KEY) {
      setQuote((current) => pick(FALLBACK_QUOTES, current ?? undefined));
      return;
    }
    setPending(true);
    const { controller, result } = startRequest();
    result.then((next) => applyResult(controller, next));
  }, [applyResult, startRequest]);

  useEffect(() => {
    if (!API_KEY) return;
    const { controller, result } = startRequest();
    result.then((next) => applyResult(controller, next));
    return () => {
      controller.abort();
      if (abortRef.current === controller) abortRef.current = null;
    };
  }, [applyResult, startRequest]);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion,
    );
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!quote) return;
    if (reduceMotion) {
      reveal.setValue(1);
      return;
    }
    reveal.setValue(0);
    Animated.timing(reveal, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [quote, reduceMotion, reveal]);

  if (!quote) return null;

  return (
    <View style={styles.quoteBand}>
      <View style={styles.quoteInner}>
        <Animated.View
          accessibilityLiveRegion="polite"
          style={{
            opacity: reveal,
            transform: [
              {
                translateY: reveal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}
        >
          <Text
            style={[
              styles.quoteText,
              isDesktop
                ? { fontSize: 30, lineHeight: 42 }
                : { fontSize: 22, lineHeight: 32 },
            ]}
          >
            “{quote.quote}”
          </Text>
          {quote.author ? (
            <Text style={styles.quoteAuthor}>— {quote.author}</Text>
          ) : null}
        </Animated.View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Show another quote"
          accessibilityState={{ busy: pending }}
          disabled={pending}
          onPress={load}
          style={({ pressed }) => [
            styles.quoteAction,
            pressed && { opacity: 0.6 },
            pending && { opacity: 0.4 },
          ]}
        >
          <Text style={styles.quoteActionText}>Another quote</Text>
        </Pressable>
      </View>
    </View>
  );
}
