import { useRef, useState } from "react";
import { View, Text, ScrollView, Animated, Pressable, Alert, Platform, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { styles, colors, spacing } from "../theme/style";
import Navbar from "../components/Navbar";
import { Image } from "expo-image";
import { router } from "expo-router";

const SERVICES = [
  { id: '1', label: 'Facial Treatment', emoji: '✨' },
  { id: '2', label: 'Skin Brightening', emoji: '🌟' },
  { id: '3', label: 'Anti-Aging', emoji: '🌿' },
  { id: '4', label: 'Acne Therapy', emoji: '💧' },
  { id: '5', label: 'Laser Therapy', emoji: '🔬' },
  { id: '6', label: 'Body Sculpting', emoji: '💆' },
];

const TESTIMONIALS = [
  { id: '1', name: 'Amelia R.', service: 'Facial Treatment', initials: 'AR', rating: 5, text: 'Absolutely transformed my skin. The team was professional, gentle, and truly understood my needs. I left glowing!' },
  { id: '2', name: 'Sofia M.', service: 'Skin Brightening', initials: 'SM', rating: 5, text: "I've tried many clinics before but LuxeDerm is on another level. My complexion has never looked this even and radiant." },
  { id: '3', name: 'Yuna K.', service: 'Anti-Aging Therapy', initials: 'YK', rating: 5, text: 'After just three sessions I noticed a visible difference. Friends keep asking what my secret is — it\'s LuxeDerm!' },
  { id: '4', name: 'Clara B.', service: 'Acne Therapy', initials: 'CB', rating: 4, text: 'Finally found a solution that works for my stubborn acne. Kind staff and a calming environment. Highly recommend.' },
  { id: '5', name: 'Nadia L.', service: 'Laser Therapy', initials: 'NL', rating: 5, text: 'Painless, quick, and incredibly effective. The results speak for themselves — smooth skin I never thought possible.' },
];

const SPECIAL_OFFERS = [
  { id: '1', name: 'Glow Starter', tagline: 'A gentle intro to your glow-up', emoji: '🌱', features: ['1 facial per month', 'Skin consultation', 'Member-only discounts'], price: '$49', featured: false },
  { id: '2', name: 'Radiance Plus', tagline: 'Our most-loved monthly plan', emoji: '✨', features: ['2 facials per month', 'LED light therapy', 'Priority booking'], price: '$89', featured: true },
  { id: '3', name: 'Luxe Signature', tagline: 'Complete care, head to toe', emoji: '👑', features: ['Unlimited facials', 'Body sculpting', '24/7 concierge'], price: '$149', featured: false },
];


export default function Index() {
  const [activeKey, setActiveKey] = useState('home');
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.45;

  // Scroll lock: while touching a horizontal card list that hasn't reached its
  // end, the outer vertical scroll is disabled so the cards scroll first.
  const [touchingList, setTouchingList] = useState<string | null>(null);
  const [servicesAtEnd, setServicesAtEnd] = useState(false);
  const [testimonialsAtEnd, setTestimonialsAtEnd] = useState(false);
  const [specialOfferAtEnd, setSpecialOfferAtEnd] = useState(false);

  const verticalScrollLocked =
    (touchingList === 'services' && !servicesAtEnd) ||
    (touchingList === 'testimonials' && !testimonialsAtEnd) ||
    (touchingList === 'special-offer' && !specialOfferAtEnd);

  const scrollRef = useRef<ScrollView>(null);
  // Store Y offset for each section
  const sectionOffsets = useRef<Record<string, number>>({});

  // Animated value for the flanking lines in "Our Services"
  const lineAnim = useRef(new Animated.Value(0)).current;
  const linesAnimated = useRef(false);

  const animateLines = () => {
    if (linesAnimated.current) return;
    linesAnimated.current = true;
    Animated.timing(lineAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  // Animated value for the flanking lines in "Testimonials"
  const testimonialLineAnim = useRef(new Animated.Value(0)).current;
  const testimonialLinesAnimated = useRef(false);

  const animateTestimonialLines = () => {
    if (testimonialLinesAnimated.current) return;
    testimonialLinesAnimated.current = true;
    Animated.timing(testimonialLineAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  // Animated value for the flanking lines in "Special Offers"
  const specialOfferLineAnim = useRef(new Animated.Value(0)).current;
  const specialOfferLinesAnimated = useRef(false);

  const animateSpecialOfferLines = () => {
    if (specialOfferLinesAnimated.current) return;
    specialOfferLinesAnimated.current = true;
    Animated.timing(specialOfferLineAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  // Sections in top-to-bottom order used for scroll-spy.
  const SECTION_KEYS = ['home', 'our-service', 'testimonial', 'special-offer', 'contact'];
  // Distance from the top where a section is considered "active".
  const SCROLL_SPY_OFFSET = 80;
  // Suppress scroll-spy while a nav-triggered animated scroll is in flight.
  const isProgrammaticScroll = useRef(false);

  const activeSectionForOffset = (y: number) => {
    let active = 'home';
    for (const key of SECTION_KEYS) {
      const top = sectionOffsets.current[key];
      if (top !== undefined && y + SCROLL_SPY_OFFSET >= top) {
        active = key;
      }
    }
    return active;
  };

  const isHorizontalAtEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    return contentOffset.x >= contentSize.width - layoutMeasurement.width - 1;
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isProgrammaticScroll.current) return;
    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
    const y = contentOffset.y;
    // When scrolled to the very bottom, the last section is active even if its
    // top never reaches the activation line (e.g. a short section near the end).
    const atBottom = y + layoutMeasurement.height >= contentSize.height - 1;
    const next = atBottom
      ? SECTION_KEYS[SECTION_KEYS.length - 1]
      : activeSectionForOffset(y);
    setActiveKey((prev) => (prev === next ? prev : next));
  };

  const handleNavPress = (key: string) => {
    setActiveKey(key);
    const offset = sectionOffsets.current[key];
    if (offset !== undefined && scrollRef.current) {
      isProgrammaticScroll.current = true;
      scrollRef.current.scrollTo({ y: offset, animated: true });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    }
  };

  const handleChoosePlan = (name: string) => {
    const message = `You selected the ${name} plan.`;
    if (Platform.OS === 'web') {
      // react-native-web's Alert is a no-op; use the browser dialog instead.
      window.alert(message);
    } else {
      Alert.alert('Plan selected', message);
    }
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <View style={styles.screen}>
      <Navbar
        activeKey={activeKey}
        onNavPress={handleNavPress}
        onSignInPress={handleSignIn}
        brandName="LuxeDerm"
      />
      <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }} onScroll={handleScroll} scrollEventThrottle={16} scrollEnabled={!verticalScrollLocked}>

        {/* Hero Section */}
        <View
          style={[styles.hero, { flexDirection: 'column', alignItems: 'center', marginBottom: spacing.section }]}
          onLayout={(e) => { sectionOffsets.current['home'] = e.nativeEvent.layout.y; }}
        >
          <Text style={styles.heroTitle}>
            LoxeDerm Lorem Ipsum{'\n'}Sit dolor Amet
          </Text>
          <Image
            style={styles.heroImageBlock}
            contentFit="contain"
            contentPosition="center"
            source={require("../../assets/images/home_hero.png")}
          />
        </View>

        {/* Our Services Section */}
        <View
          style={{ paddingTop: spacing.section, paddingBottom: spacing.xxl }}
          onLayout={(e) => {
            sectionOffsets.current['our-service'] = e.nativeEvent.layout.y;
            animateLines();
          }}
        >
          {/* Section title with flanking lines */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, paddingHorizontal: spacing.xl }}>
            <Animated.View style={{ flex: 1, height: 1, backgroundColor: colors.line, transform: [{ scaleX: lineAnim }], transformOrigin: 'right' }} />
            <Text style={[styles.sectionTitle, { marginBottom: 0, paddingHorizontal: spacing.lg }]}>
              Our Services
            </Text>
            <Animated.View style={{ flex: 1, height: 1, backgroundColor: colors.line, transform: [{ scaleX: lineAnim }], transformOrigin: 'left' }} />
          </View>

          <Text style={[styles.sectionSubtitle, { paddingHorizontal: spacing.xl, marginBottom: spacing.lg }]}>
            Tailored treatments for your skin's unique needs
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.sm }}
            onTouchStart={() => setTouchingList('services')}
            onTouchEnd={() => setTouchingList(null)}
            onTouchCancel={() => setTouchingList(null)}
            onScroll={(e) => setServicesAtEnd(isHorizontalAtEnd(e))}
            onMomentumScrollEnd={(e) => setServicesAtEnd(isHorizontalAtEnd(e))}
            scrollEventThrottle={16}
          >
            {SERVICES.map((service) => (
              <View key={service.id} style={[styles.serviceCard, { width: cardWidth }]}>
                <View style={[styles.serviceImage, { alignItems: 'center', justifyContent: 'center' }]}>
                  <Text style={{ fontSize: 56 }}>{service.emoji}</Text>
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Testimonials Section */}
        <View
          style={{ paddingTop: spacing.section, paddingBottom: spacing.xxl, marginTop: spacing.section, backgroundColor: colors.creamDeep }}
          onLayout={(e) => {
            sectionOffsets.current['testimonial'] = e.nativeEvent.layout.y;
            animateTestimonialLines();
          }}
        >
          {/* Section title with flanking lines */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, paddingHorizontal: spacing.xl }}>
            <Animated.View style={{ flex: 1, height: 1, backgroundColor: colors.line, transform: [{ scaleX: testimonialLineAnim }], transformOrigin: 'right' }} />
            <Text style={[styles.sectionTitle, { marginBottom: 0, paddingHorizontal: spacing.lg }]}>
              Testimonials
            </Text>
            <Animated.View style={{ flex: 1, height: 1, backgroundColor: colors.line, transform: [{ scaleX: testimonialLineAnim }], transformOrigin: 'left' }} />
          </View>

          <Text style={[styles.sectionSubtitle, { paddingHorizontal: spacing.xl, marginBottom: spacing.lg }]}>
            Real results, real stories from our clients
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.sm }}
            onTouchStart={() => setTouchingList('testimonials')}
            onTouchEnd={() => setTouchingList(null)}
            onTouchCancel={() => setTouchingList(null)}
            onScroll={(e) => setTestimonialsAtEnd(isHorizontalAtEnd(e))}
            onMomentumScrollEnd={(e) => setTestimonialsAtEnd(isHorizontalAtEnd(e))}
            scrollEventThrottle={16}
          >
            {TESTIMONIALS.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.testimonialCard,
                  { width: width * 0.72, marginRight: spacing.lg, paddingTop: spacing.xxl + 8, minHeight: 220, justifyContent: 'space-between' },
                ]}
              >
                {/* Avatar circle */}
                <View style={[styles.testimonialAvatar, {
                  alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tan, top: 10,
                }]}>
                  <Text style={{ color: colors.white, fontFamily: 'System', fontSize: 15, fontWeight: '700' }}>
                    {item.initials}
                  </Text>
                </View>

                {/* Star rating */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.sm }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Text key={i} style={{ fontSize: 14, color: i < item.rating ? colors.gold : colors.muted, marginRight: 2, top: 17 }}>★</Text>
                  ))}
                </View>

                <Text style={styles.testimonialText}>"{item.text}"</Text>
                <Text style={styles.testimonialAuthor}>{item.name}</Text>
                <Text style={styles.testimonialService}>{item.service}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Special Offers Section */}
        <View
          style={{ paddingTop: spacing.section, paddingBottom: spacing.xxl, marginTop: spacing.section }}
          onLayout={(e) => {
            sectionOffsets.current['special-offer'] = e.nativeEvent.layout.y;
            animateSpecialOfferLines();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, paddingHorizontal: spacing.xl }}>
            <Animated.View style={{ flex: 1, height: 1, backgroundColor: colors.line, transform: [{ scaleX: specialOfferLineAnim }], transformOrigin: 'right' }} />
            <Text style={[styles.sectionTitle, { marginBottom: 0, paddingHorizontal: spacing.lg }]}>
              Special Offers
            </Text>
            <Animated.View style={{ flex: 1, height: 1, backgroundColor: colors.line, transform: [{ scaleX: specialOfferLineAnim }], transformOrigin: 'left' }} />
          </View>

          <Text style={[styles.sectionSubtitle, { paddingHorizontal: spacing.xl, marginBottom: spacing.lg }]}>
            Limited-time packages to elevate your glow
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.sm }}
            onTouchStart={() => setTouchingList('special-offer')}
            onTouchEnd={() => setTouchingList(null)}
            onTouchCancel={() => setTouchingList(null)}
            onScroll={(e) => setSpecialOfferAtEnd(isHorizontalAtEnd(e))}
            onMomentumScrollEnd={(e) => setSpecialOfferAtEnd(isHorizontalAtEnd(e))}
            scrollEventThrottle={16}
          >
            {SPECIAL_OFFERS.map((plan) => (
              <View key={plan.id} style={[styles.pricingCard, { width: width * 0.68, minHeight: 460 }]}>
                <View style={[styles.pricingImageWrap, { alignItems: 'center', justifyContent: 'center' }]}>
                  <Text style={{ fontSize: 72 }}>{plan.emoji}</Text>
                </View>
                <View style={styles.pricingBody}>
                  <Text style={styles.pricingName}>{plan.name}</Text>
                  <Text style={styles.pricingTagline}>{plan.tagline}</Text>
                  {plan.features.map((feature) => (
                    <View key={feature} style={styles.pricingFeatureRow}>
                      <Text style={styles.pricingCheck}>✓</Text>
                      <Text style={styles.pricingFeatureText}>{feature}</Text>
                    </View>
                  ))}
                  <Text style={styles.pricingPrice}>
                    {plan.price}
                    <Text style={{ fontSize: 14, color: colors.muted }}> /mo</Text>
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      plan.featured ? styles.pricingButtonFeatured : styles.buttonBlush,
                      pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
                    ]}
                    onPress={() => handleChoosePlan(plan.name)}
                  >
                    <Text style={{ color: plan.featured ? colors.white : colors.inkSoft, fontWeight: '700', fontSize: 14 }}>
                      Choose Plan
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Contact Section */}
        <View
          style={{ paddingTop: spacing.section, paddingBottom: spacing.section, marginTop: spacing.section, backgroundColor: colors.creamDeep }}
          onLayout={(e) => { sectionOffsets.current['contact'] = e.nativeEvent.layout.y; }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, paddingHorizontal: spacing.xl }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.line }} />
            <Text style={[styles.sectionTitle, { marginBottom: 0, paddingHorizontal: spacing.lg }]}>
              Contact Us
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.line }} />
          </View>

          <View style={{ paddingHorizontal: spacing.xl, alignItems: 'center' }}>
            <Text style={[styles.bodyText, { textAlign: 'center', maxWidth: 560, marginBottom: spacing.xl }]}>
              LuxeDerm is a premium aesthetic clinic devoted to healthy, glowing skin. Our certified specialists combine advanced technology with personalized care to help you look and feel your best.
            </Text>

            <View style={styles.contactCard}>
              <Text style={styles.contactLabel}>📍 Location</Text>
              <Text style={styles.contactValue}>Jl. Kemang Raya No. 88, South Jakarta 12730</Text>
              <Text style={[styles.contactLabel, { marginTop: spacing.lg }]}>📞 Phone</Text>
              <Text style={styles.contactValue}>+62 812 3456 7890</Text>
              <Text style={[styles.contactLabel, { marginTop: spacing.lg }]}>✉️ Email</Text>
              <Text style={styles.contactValue}>hello@luxederm.id</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.buttonPrimary,
                { alignSelf: 'center', marginTop: spacing.xl },
                pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
              ]}
              onPress={handleSignIn}
            >
              <Text style={[styles.buttonPrimaryText, { marginRight: 0 }]}>Sign In</Text>
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>LuxeDerm</Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Home</Text>
            <Text style={styles.footerLink}>Our Service</Text>
            <Text style={styles.footerLink}>Special Offer</Text>
            <Text style={styles.footerLink}>Contact</Text>
          </View>
        </View>
        <Text style={styles.footerCopy}>© 2026 LuxeDerm. All rights reserved.</Text>

      </ScrollView>
    </View>
  );
}