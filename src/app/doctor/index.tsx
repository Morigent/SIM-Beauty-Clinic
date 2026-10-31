import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { colors, styles } from "../../theme/style";
import { DOCTORS, TREATMENTS } from "../../utils/data";

export default function DoctorDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = DOCTORS.find((d) => d.id === id) ?? DOCTORS[0];
  const treatments = TREATMENTS.filter((t) =>
    doctor.treatmentIds.includes(t.id),
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: doctor.name,
          headerStyle: { backgroundColor: colors.cream },
          headerTintColor: colors.inkSoft,
        }}
      />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.doctorDetailContainer}
      >
        <Image
          style={styles.doctorDetailPhoto}
          source={doctor.image}
          contentFit="cover"
        />
        <Text style={styles.doctorDetailSpecialty}>{doctor.specialty}</Text>
        <Text accessibilityRole="header" style={styles.doctorDetailName}>
          {doctor.name}
        </Text>
        <Text style={styles.doctorDetailAbout}>{doctor.about}</Text>

        {treatments.length > 0 && (
          <View>
            <Text accessibilityRole="header" style={styles.doctorDetailHeading}>
              Treatments
            </Text>
            {treatments.map((treatment) => (
              <View key={treatment.id} style={styles.doctorDetailTreatment}>
                <View style={styles.doctorDetailTreatmentMain}>
                  <Text style={styles.doctorDetailTreatmentName}>
                    {treatment.name}
                  </Text>
                  <Text style={styles.doctorDetailTreatmentDesc}>
                    {treatment.description}
                  </Text>
                </View>
                <Text style={styles.doctorDetailTreatmentMeta}>
                  {treatment.duration} · {treatment.price}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/user")}
          style={({ pressed }) => [
            styles.doctorDetailCta,
            pressed && styles.doctorDetailCtaPressed,
          ]}
        >
          <Text style={styles.doctorDetailCtaText}>Book an appointment</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
