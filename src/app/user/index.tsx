import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Stack, router } from "expo-router";
import { useRef, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { colors, styles } from "../../theme/style";
import {
  DOCTORS,
  TIME_SLOTS,
  TREATMENTS,
  currentUser,
  type Doctor,
  type Treatment,
} from "../../utils/data";

type Mode = "doctor" | "treatment";

type AppointmentStatus = "pending" | "confirmed" | "complete" | "cancelled";

type Appointment = {
  doctorId: string;
  treatmentId: string;
  dayIndex: number;
  slot: string;
  status: AppointmentStatus;
};

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
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [slotWarning, setSlotWarning] = useState(false);
  const [scheduleY, setScheduleY] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

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

  const appointmentDoctor = appointment
    ? DOCTORS.find((d) => d.id === appointment.doctorId)
    : null;
  const appointmentTreatment = appointment
    ? TREATMENTS.find((t) => t.id === appointment.treatmentId)
    : null;
  const appointmentDay = appointment ? days[appointment.dayIndex] : null;

  const acceptBooking = () => {
    if (!slot) {
      return;
    }
    setAppointment({
      doctorId,
      treatmentId,
      dayIndex,
      slot,
      status: "pending",
    });
    setConfirmOpen(false);
    setSlot(null);
  };

  // Missing input is not a dead end: point the user at the section that needs it.
  const requestSchedule = () => {
    if (!slot) {
      setSlotWarning(true);
      scrollRef.current?.scrollTo({
        y: Math.max(scheduleY - 24, 0),
        animated: true,
      });
      return;
    }
    setConfirmOpen(true);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "LuxeDerm",
          headerStyle: { backgroundColor: colors.cream },
          headerShadowVisible: false,
          headerTintColor: colors.inkSoft,
          headerRight: () => (
            <Pressable
              onPress={() =>
                router.push(currentUser ? "/profile" : "/sign-in")
              }
              accessibilityLabel="Profile"
              style={styles.bookingHeaderButton}
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

      <ScrollView
        ref={scrollRef}
        style={styles.bookingScreen}
        contentContainerStyle={styles.bookingContent}
      >
        {appointment &&
        appointmentDoctor &&
        appointmentTreatment &&
        appointmentDay ? (
          <View style={styles.bookingConfirmed}>
            <Text style={styles.bookingConfirmedTitle}>Your appointment</Text>
            <Text style={styles.bookingConfirmedBody}>
              {appointmentDoctor.name} — {appointmentTreatment.name}
            </Text>
            <Text style={styles.bookingConfirmedMeta}>
              {appointmentDay.day}, {appointmentDay.date} {appointmentDay.month}{" "}
              at {appointment.slot}
            </Text>
            <View style={styles.bookingStatusPill}>
              <Text style={styles.bookingStatusText}>
                {appointment.status}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.bookingHeader}>
          <Text style={styles.bookingTitle}>Book a treatment</Text>
          <Text style={styles.bookingSubtitle}>
            {treatment.name} with {doctor.name} · {treatment.duration} ·{" "}
            {treatment.price}
          </Text>
        </View>

        <View style={styles.bookingTabs}>
          {(["doctor", "treatment"] as Mode[]).map((m) => {
            const active = m === mode;
            return (
              <Pressable
                key={m}
                style={[styles.bookingTab, active && styles.bookingTabActive]}
                onPress={() => setMode(m)}
              >
                <Text
                  style={[
                    styles.bookingTabText,
                    active && styles.bookingTabTextActive,
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
            <View style={styles.bookingField}>
              <Text style={styles.bookingLabel}>Select doctor</Text>
              <DoctorPicker
                doctors={DOCTORS}
                selectedId={doctorId}
                onSelect={pickDoctor}
              />
            </View>

            <View style={styles.bookingField}>
              <Text style={styles.bookingLabel}>
                Treatments this doctor offers
              </Text>
              <TreatmentPicker
                treatments={doctorTreatments}
                selectedId={treatmentId}
                onSelect={pickTreatment}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.bookingField}>
              <Text style={styles.bookingLabel}>Select treatment</Text>
              <TreatmentPicker
                treatments={TREATMENTS}
                selectedId={treatmentId}
                onSelect={pickTreatment}
              />
            </View>

            <View style={styles.bookingField}>
              <Text style={styles.bookingLabel}>
                Doctors who offer this treatment
              </Text>
              <DoctorPicker
                doctors={capableDoctors}
                selectedId={doctorId}
                onSelect={pickDoctor}
              />
            </View>
          </>
        )}

        <View
          style={styles.bookingSchedule}
          onLayout={(e) => setScheduleY(e.nativeEvent.layout.y)}
        >
          {slotWarning ? (
            <View style={styles.bookingWarning}>
              <MaterialDesignIcons
                name="alert-circle-outline"
                size={18}
                color={colors.tanDark}
              />
              <Text style={styles.bookingWarningText}>
                Select a time slot to continue.
              </Text>
            </View>
          ) : null}

          <Text style={styles.bookingLabel}>Schedule</Text>

          <View style={styles.bookingDayRow}>
            {days.map((d, i) => {
              const active = i === dayIndex;
              return (
                <Pressable
                  key={`${d.day}-${d.date}`}
                  style={[styles.bookingDay, active && styles.bookingDayActive]}
                  onPress={() => {
                    setDayIndex(i);
                    setSlot(null);
                  }}
                >
                  <Text style={styles.bookingDayName}>{d.day}</Text>
                  <Text style={styles.bookingDayDate}>{d.date}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.bookingSlotRow}>
            {TIME_SLOTS.map((t) => {
              const active = t === slot;
              return (
                <Pressable
                  key={t}
                  style={[styles.bookingSlot, active && styles.bookingSlotActive]}
                  onPress={() => {
                    setSlot(t);
                    setSlotWarning(false);
                  }}
                >
                  <Text
                    style={[
                      styles.bookingSlotText,
                      active && styles.bookingSlotTextActive,
                    ]}
                  >
                    {t}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.bookingSummary}>
          <Text style={styles.bookingSummaryTitle}>{treatment.name}</Text>
          <Text style={styles.bookingSummaryDoctor}>{doctor.name}</Text>
          <Text style={styles.bookingSummaryDescription}>
            {treatment.description}
          </Text>
          <View style={styles.bookingSummaryMeta}>
            <Text style={styles.bookingSummaryMetaText}>
              {treatment.duration}
            </Text>
            <Text style={styles.bookingSummaryPrice}>{treatment.price}</Text>
            {slot ? (
              <Text style={styles.bookingSummaryMetaText}>
                {selectedDay.day}, {selectedDay.date} {selectedDay.month} at{" "}
                {slot}
              </Text>
            ) : null}
          </View>
        </View>

        <Pressable style={styles.bookingPrimary} onPress={requestSchedule}>
          <Text style={styles.bookingPrimaryText}>Confirm appointment</Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={confirmOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmOpen(false)}
      >
        <View style={styles.bookingModalOverlay}>
          <View style={styles.bookingModalCard}>
            <Text style={styles.bookingModalTitle}>
              Confirm your appointment
            </Text>
            <View style={styles.bookingModalRow}>
              <Text style={styles.bookingModalLabel}>Doctor</Text>
              <Text style={styles.bookingModalValue}>{doctor.name}</Text>
            </View>
            <View style={styles.bookingModalRow}>
              <Text style={styles.bookingModalLabel}>Treatment</Text>
              <Text style={styles.bookingModalValue}>{treatment.name}</Text>
            </View>
            <View style={styles.bookingModalRow}>
              <Text style={styles.bookingModalLabel}>Date</Text>
              <Text style={styles.bookingModalValue}>
                {selectedDay.day}, {selectedDay.date} {selectedDay.month}
              </Text>
            </View>
            <View style={styles.bookingModalRow}>
              <Text style={styles.bookingModalLabel}>Time</Text>
              <Text style={styles.bookingModalValue}>{slot}</Text>
            </View>
            <Text style={styles.bookingModalHint}>
              Are you sure about these details?
            </Text>
            <View style={styles.bookingModalActions}>
              <Pressable
                style={styles.bookingModalCancel}
                onPress={() => setConfirmOpen(false)}
              >
                <Text style={styles.bookingModalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.bookingModalAccept} onPress={acceptBooking}>
                <Text style={styles.bookingModalAcceptText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    <View style={styles.bookingOptions}>
      {doctors.map((d) => {
        const active = d.id === selectedId;
        return (
          <Pressable
            key={d.id}
            style={[styles.bookingOption, active && styles.bookingOptionActive]}
            onPress={() => onSelect(d.id)}
          >
            <View style={styles.bookingOptionText}>
              <Text style={styles.bookingOptionName}>{d.name}</Text>
              <Text style={styles.bookingOptionMeta}>{d.specialty}</Text>
            </View>
            <View
              style={[styles.bookingRadio, active && styles.bookingRadioActive]}
            />
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
}: {
  treatments: Treatment[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.bookingChips}
    >
      {treatments.map((t) => {
        const active = t.id === selectedId;
        return (
          <Pressable
            key={t.id}
            style={[styles.bookingChip, active && styles.bookingChipActive]}
            onPress={() => onSelect(t.id)}
          >
            <Text
              style={[
                styles.bookingChipText,
                active && styles.bookingChipTextActive,
              ]}
            >
              {t.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
