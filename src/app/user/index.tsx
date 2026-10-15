import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Stack, router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { colors, fontSize, fonts, radius, spacing } from "../../theme/style";
import {
  DOCTORS,
  TREATMENTS,
  currentUser,
  type Doctor,
  type Treatment,
} from "../../utils/data";

type Mode = "doctor" | "treatment";

// Above this width the layout gets desktop-style alignment; below it stays mobile.
const MEDIUM_SCREEN = 768;

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

function nextWeekDays(): { day: string; date: number; month: string }[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString(undefined, { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString(undefined, { month: "short" }),
    };
  });
}

export default function User() {
  const [mode, setMode] = useState<Mode>("doctor");
  const [doctorId, setDoctorId] = useState(DOCTORS[0].id);
  const [treatmentId, setTreatmentId] = useState(TREATMENTS[0].id);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const medium = width >= MEDIUM_SCREEN;

  const days = nextWeekDays();
  const doctor = DOCTORS.find((d) => d.id === doctorId)!;
  const treatment = TREATMENTS.find((t) => t.id === treatmentId)!;

  // Keep the pair consistent: a selected doctor always offers the selected treatment.
  const pickDoctor = (id: string) => {
    const next = DOCTORS.find((d) => d.id === id)!;
    setDoctorId(id);
    if (!next.treatmentIds.includes(treatmentId)) {
      setTreatmentId(next.treatmentIds[0]);
    }
  };

  const pickTreatment = (id: string) => {
    setTreatmentId(id);
    if (
      !DOCTORS.some((d) => d.id === doctorId && d.treatmentIds.includes(id))
    ) {
      setDoctorId(DOCTORS.find((d) => d.treatmentIds.includes(id))!.id);
    }
  };

  const doctorTreatments = TREATMENTS.filter((t) =>
    doctor.treatmentIds.includes(t.id),
  );
  const capableDoctors = DOCTORS.filter((d) =>
    d.treatmentIds.includes(treatmentId),
  );

  const selectedDay = days[dayIndex];

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <Stack.Screen
        options={{
          title: "LuxeDerm",
          headerStyle: { backgroundColor: colors.cream },
          headerShadowVisible: false,
          headerTintColor: colors.inkSoft,
          headerRight: () => (
            <Pressable
              onPress={() => router.push(currentUser ? "/profile" : "/sign-in")}
              accessibilityLabel="Profile"
              style={s.headerButton}
            >
              <MaterialDesignIcons
                name="account-circle-outline"
                size={26}
                color={colors.inkSoft}
              />
            </Pressable>
          ),
        }}
      />

      <Text style={s.pageTitle}>Book a treatment</Text>

      <View style={[s.segmented, medium && s.segmentedMedium]}>
        {(["doctor", "treatment"] as Mode[]).map((m) => {
          const active = m === mode;
          return (
            <Pressable
              key={m}
              style={[s.segment, active && s.segmentActive, medium && s.segmentMedium]}
              onPress={() => setMode(m)}
            >
              <Text
                style={[
                  s.segmentText,
                  active && s.segmentTextActive,
                  medium && s.segmentTextMedium,
                ]}
              >
                {m === "doctor" ? "By doctor" : "By treatment"}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {mode === "doctor" ? (
        <>
          <Text style={s.sectionLabel}>Select doctor</Text>
          <DoctorPicker
            doctors={DOCTORS}
            selectedId={doctorId}
            onSelect={pickDoctor}
          />

          <Text style={[s.sectionLabel, medium && s.centeredLabel]}>
            Treatments this doctor offers
          </Text>
          <TreatmentPicker
            treatments={doctorTreatments}
            selectedId={treatmentId}
            onSelect={pickTreatment}
            center={medium}
          />
        </>
      ) : (
        <>
          <Text style={[s.sectionLabel, medium && s.centeredLabel]}>
            Select treatment
          </Text>
          <TreatmentPicker
            treatments={TREATMENTS}
            selectedId={treatmentId}
            onSelect={pickTreatment}
            center={medium}
          />

          <Text style={s.sectionLabel}>Doctors who offer this treatment</Text>
          <DoctorPicker
            doctors={capableDoctors}
            selectedId={doctorId}
            onSelect={pickDoctor}
          />
        </>
      )}

      <View style={[s.sectionHeader, medium && s.centeredRowInline]}>
        <MaterialDesignIcons
          name="calendar-month"
          size={18}
          color={colors.tanDark}
        />
        <Text style={s.sectionLabel}>Schedule — next week</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[s.dayRow, medium && s.centeredRow]}
      >
        {days.map((d, i) => {
          const active = i === dayIndex;
          return (
            <Pressable
              key={`${d.day}-${d.date}`}
              style={[s.dayCard, active && s.dayCardActive]}
              onPress={() => {
                setDayIndex(i);
                setSlot(null);
              }}
            >
              <Text style={[s.dayName, active && s.dayTextActive]}>
                {d.day}
              </Text>
              <Text style={[s.dayDate, active && s.dayTextActive]}>
                {d.date}
              </Text>
              <Text style={[s.dayMonth, active && s.dayTextActive]}>
                {d.month}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[s.slotRow, medium && s.centeredRowInline]}>
        {timeSlots.map((t) => {
          const active = t === slot;
          return (
            <Pressable
              key={t}
              style={[s.slot, active && s.slotActive]}
              onPress={() => setSlot(t)}
            >
              <MaterialDesignIcons
                name="clock-outline"
                size={14}
                color={active ? colors.white : colors.body}
              />
              <Text style={[s.slotText, active && s.slotTextActive]}>{t}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={s.infoCard}>
        <View style={s.infoHeader}>
          <MaterialDesignIcons
            name="information-outline"
            size={20}
            color={colors.tanDark}
          />
          <Text style={s.infoTitle}>{treatment.name}</Text>
        </View>
        <Text style={s.infoDoctor}>{doctor.name}</Text>
        <Text style={s.infoDescription}>{treatment.description}</Text>
        <View style={s.infoMeta}>
          <Text style={s.infoMetaText}>{treatment.duration}</Text>
          <Text style={s.infoMetaText}>{treatment.price}</Text>
          {slot ? (
            <Text style={s.infoMetaText}>
              {selectedDay.day}, {selectedDay.date} {selectedDay.month} at{" "}
              {slot}
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

function DoctorPicker({
  doctors,
  selectedId,
  onSelect,
}: {
  doctors: Doctor[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={s.doctorList}>
      {doctors.map((d) => {
        const active = d.id === selectedId;
        return (
          <Pressable
            key={d.id}
            style={[s.doctorCard, active && s.doctorCardActive]}
            onPress={() => onSelect(d.id)}
          >
            <MaterialDesignIcons
              name="stethoscope"
              size={18}
              color={active ? colors.white : colors.tanDark}
            />
            <View style={s.doctorTextBlock}>
              <Text style={[s.doctorName, active && s.doctorTextActive]}>
                {d.name}
              </Text>
              <Text style={[s.doctorSpecialty, active && s.doctorTextActive]}>
                {d.specialty}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function TreatmentPicker({
  treatments,
  selectedId,
  onSelect,
  center = false,
}: {
  treatments: Treatment[];
  selectedId: string;
  onSelect: (id: string) => void;
  center?: boolean;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[s.treatmentRow, center && s.centeredRow]}
    >
      {treatments.map((t) => {
        const active = t.id === selectedId;
        return (
          <Pressable
            key={t.id}
            style={[s.chip, active && s.chipActive]}
            onPress={() => onSelect(t.id)}
          >
            <MaterialDesignIcons
              name={t.icon}
              size={16}
              color={active ? colors.white : colors.body}
            />
            <Text style={[s.chipText, active && s.chipTextActive]}>
              {t.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.xl, gap: spacing.lg },

  headerButton: { padding: spacing.sm, marginRight: spacing.sm },

  pageTitle: {
    fontFamily: fonts.heading,
    fontSize: fontSize.h2,
    color: colors.inkSoft,
    textAlign: "center",
  },

  segmented: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.pill,
    padding: 2,
    backgroundColor: colors.white,
  },
  segment: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  segmentActive: { backgroundColor: colors.tan },
  segmentText: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.body,
  },
  segmentTextActive: { color: colors.white, fontFamily: fonts.bodyMedium },

  segmentedMedium: { alignSelf: "flex-start", width: 340 },
  segmentMedium: { paddingVertical: spacing.xs },
  segmentTextMedium: { fontSize: fontSize.caption },

  centeredLabel: { textAlign: "center" },
  centeredRow: { flexGrow: 1, justifyContent: "center" },
  centeredRowInline: { justifyContent: "center" },

  sectionLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.small,
    color: colors.body,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  doctorList: { gap: spacing.sm },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  doctorCardActive: { backgroundColor: colors.tan, borderColor: colors.tan },
  doctorTextBlock: { flex: 1, gap: 2 },
  doctorName: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.base,
    color: colors.inkSoft,
  },
  doctorSpecialty: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.muted,
  },
  doctorTextActive: { color: colors.white },

  treatmentRow: { gap: spacing.sm, paddingVertical: spacing.xs },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  chipActive: { backgroundColor: colors.tan, borderColor: colors.tan },
  chipText: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.body,
  },
  chipTextActive: { color: colors.white },

  dayRow: { gap: spacing.sm, paddingVertical: spacing.xs },
  dayCard: {
    alignItems: "center",
    gap: 2,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    minWidth: 72,
  },
  dayCardActive: { backgroundColor: colors.tan, borderColor: colors.tan },
  dayName: {
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  dayDate: {
    fontFamily: fonts.heading,
    fontSize: fontSize.h3,
    color: colors.inkSoft,
  },
  dayMonth: {
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    color: colors.muted,
  },
  dayTextActive: { color: colors.white },

  slotRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  slot: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  slotActive: { backgroundColor: colors.tan, borderColor: colors.tan },
  slotText: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.body,
  },
  slotTextActive: { color: colors.white },

  infoCard: {
    padding: spacing.xl,
    gap: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 4,
    borderRadius: radius.md,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  infoTitle: {
    fontFamily: fonts.heading,
    fontSize: fontSize.h3,
    color: colors.inkSoft,
  },
  infoDoctor: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.small,
    color: colors.tanDark,
  },
  infoDescription: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    color: colors.body,
    lineHeight: 22,
  },
  infoMeta: { gap: spacing.xs, marginTop: spacing.xs },
  infoMetaText: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.muted,
  },
});
