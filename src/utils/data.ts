import type { MaterialDesignIconsIconName } from "@react-native-vector-icons/material-design-icons";
import type { ImageSourcePropType } from "react-native";
import { supabase } from "./supabase";

export type UserRole = "patient" | "employee" | "doctor" | "admin";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export interface Profile {
  id: string;
  role: UserRole;
  fullName: string;
  phone: string | null;
  dob: string | null;
  address: string | null;
}

export interface ProfileDraft {
  fullName: string;
  phone: string;
  dob: string;
  address: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  treatmentId: string;
  startsAt: string;
  status: AppointmentStatus;
}

export interface Treatment {
  id: string;
  name: string;
  icon: MaterialDesignIconsIconName;
  duration: string;
  price: string;
  description: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  treatmentIds: string[];
  image: ImageSourcePropType;
  about: string;
}

export const TREATMENTS: Treatment[] = [
  {
    id: "hydrafacial",
    name: "HydraFacial",
    icon: "spa",
    duration: "45 min",
    price: "$120",
    description:
      "Deep cleanse, exfoliation, and hydration in one treatment for an instant glow.",
  },
  {
    id: "microneedling",
    name: "Microneedling",
    icon: "needle",
    duration: "60 min",
    price: "$180",
    description:
      "Fine needles stimulate collagen to smooth texture, scars, and fine lines.",
  },
  {
    id: "chemical-peel",
    name: "Chemical Peel",
    icon: "bottle-tonic",
    duration: "30 min",
    price: "$90",
    description:
      "A gentle acid solution resurfaces skin, improving tone and clarity.",
  },
  {
    id: "dermaplaning",
    name: "Dermaplaning",
    icon: "content-cut",
    duration: "30 min",
    price: "$70",
    description:
      "Removes dead skin and fine vellus hair for a smooth, radiant surface.",
  },
  {
    id: "botox",
    name: "Botox",
    icon: "needle",
    duration: "20 min",
    price: "$250",
    description:
      "Relaxes targeted muscles to soften expression lines and wrinkles.",
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: "ava",
    name: "Dr. Ava Chen",
    specialty: "Facial aesthetics",
    treatmentIds: ["hydrafacial", "dermaplaning", "chemical-peel"],
    image: require("../../assets/Doctor/q4-hero-lena.webp"),
    about:
      "Ava pairs gentle exfoliation with deep hydration to bring out skin's natural glow without overdoing it.",
  },
  {
    id: "noah",
    name: "Dr. Noah Patel",
    specialty: "Cosmetic dermatology",
    treatmentIds: ["microneedling", "botox"],
    image: require("../../assets/Doctor/2a125c7aa0d47538b857291fa0901286.jpg"),
    about:
      "Noah focuses on texture and tone, using collagen-stimulating and muscle-relaxing treatments for a refreshed look.",
  },
  {
    id: "mia",
    name: "Dr. Mia Rossi",
    specialty: "Skin rejuvenation",
    treatmentIds: ["chemical-peel", "hydrafacial", "botox"],
    image: require("../../assets/Doctor/beautiful-young-female-doctor-looking-camera-office_1301-7807.avif"),
    about:
      "Mia blends resurfacing peels with hydrating facials, tailoring each step to sensitive and combination skin.",
  },
  {
    id: "liam",
    name: "Dr. Liam Kim",
    specialty: "Dermatologic surgery",
    treatmentIds: ["microneedling", "dermaplaning", "hydrafacial"],
    image: require("../../assets/Doctor/images (1).jpg"),
    about:
      "Liam handles precise, low-downtime procedures and pairs them with surface smoothing for an even result.",
  },
  {
    id: "sora",
    name: "Dr. Sora Tan",
    specialty: "Laser therapy",
    treatmentIds: [],
    image: require("../../assets/Doctor/images.jpg"),
    about:
      "Sora specialises in energy-based treatments for pigmentation, redness, and scarring, guided by skin-type analysis.",
  },
];

export const TIME_SLOTS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

// GoTrue reports failures by code; these are the ones the sign-in screen can
// actually reach. Anything else falls through to the server message.
const AUTH_ERRORS: Record<string, string> = {
  invalid_credentials: "Wrong email or password.",
  email_not_confirmed:
    "Confirm your email address before logging in. Check your inbox.",
  user_already_exists: "An account with this email already exists. Log in instead.",
  weak_password: "Choose a password with at least 6 characters.",
  over_email_send_rate_limit:
    "Too many emails were sent. Try again in a few minutes.",
  over_request_rate_limit: "Too many attempts. Try again in a few minutes.",
};

/** Resolves to null on success, or a message to show the user. */
export async function signIn(
  email: string,
  password: string,
): Promise<string | null> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  return error ? (AUTH_ERRORS[error.code ?? ""] ?? error.message) : null;
}

export async function signUp(
  name: string,
  email: string,
  password: string,
): Promise<{ error: string | null; needsConfirmation: boolean }> {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { full_name: name.trim() } },
  });
  if (error) {
    return {
      error: AUTH_ERRORS[error.code ?? ""] ?? error.message,
      needsConfirmation: false,
    };
  }
  // Email confirmation is enabled on this project: no session arrives until
  // the address is verified.
  return { error: null, needsConfirmation: data.session === null };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function loadProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, full_name, phone, dob, address")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return {
    id: data.id,
    role: data.role,
    fullName: data.full_name,
    phone: data.phone,
    dob: data.dob,
    address: data.address,
  };
}

export async function saveProfile(draft: ProfileDraft): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return "Log in to save your profile.";

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: draft.fullName.trim(),
      phone: draft.phone.trim() || null,
      dob: draft.dob.trim() || null,
      address: draft.address.trim() || null,
    })
    .eq("id", user.id)
    .select("id")
    .single();

  if (!error) return null;
  if (error.code === "22007" || error.code === "22008") {
    return "Enter the date of birth as YYYY-MM-DD.";
  }
  return error.message;
}

type UpcomingRow = {
  id: string;
  starts_at: string;
  status: AppointmentStatus;
  // Many-to-one embeds arrive as objects, but the untyped client infers arrays.
  doctor: { slug: string };
  treatment: { slug: string };
};

export async function loadUpcomingAppointment(): Promise<Appointment | null> {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, starts_at, status, doctor:doctor_profiles(slug), treatment:treatments(slug)",
    )
    .in("status", ["pending", "confirmed"])
    .gte("starts_at", new Date().toISOString())
    .order("starts_at")
    .limit(1)
    .returns<UpcomingRow[]>();
  if (error) throw new Error(error.message);
  const row = data?.[0];
  if (!row) return null;
  return {
    id: row.id,
    doctorId: row.doctor.slug,
    treatmentId: row.treatment.slug,
    startsAt: row.starts_at,
    status: row.status,
  };
}

/** Resolves to null on success, or a message to show the user. */
export async function createAppointment(
  doctorId: string,
  treatmentId: string,
  startsAt: Date,
): Promise<string | null> {
  const [doctor, treatment, session] = await Promise.all([
    supabase
      .from("doctor_profiles")
      .select("doctor_id")
      .eq("slug", doctorId)
      .maybeSingle(),
    supabase
      .from("treatments")
      .select("id, duration_min")
      .eq("slug", treatmentId)
      .maybeSingle(),
    supabase.auth.getUser(),
  ]);
  if (doctor.error) return doctor.error.message;
  if (treatment.error) return treatment.error.message;
  if (!doctor.data || !treatment.data) {
    return "This doctor or treatment is no longer available.";
  }
  if (!session.data.user) return "Log in to book an appointment.";

  const { error } = await supabase.from("appointments").insert({
    patient_id: session.data.user.id,
    doctor_id: doctor.data.doctor_id,
    treatment_id: treatment.data.id,
    starts_at: startsAt.toISOString(),
    ends_at: new Date(
      startsAt.getTime() + treatment.data.duration_min * 60_000,
    ).toISOString(),
  });
  if (!error) return null;
  // NR-06: the partial unique index owns conflict detection.
  return error.code === "23505"
    ? "That slot was just booked by someone else. Pick another time."
    : error.message;
}

/** Resolves to null on success, or a message to show the user. */
export async function cancelAppointment(id: string): Promise<string | null> {
  const { error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", id);
  return error ? error.message : null;
}

