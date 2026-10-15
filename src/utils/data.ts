import type { MaterialDesignIconsIconName } from "@react-native-vector-icons/material-design-icons";

export interface User {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dob?: string;
  address?: string;
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
}

// ponytail: in-memory dummy auth. Replace with a real backend before release.
const USERS: User[] = [
  { name: "Ava Chen", email: "ava@luxederm.com", password: "ava123" },
  { name: "Noah Patel", email: "noah@luxederm.com", password: "noah123" },
];

export let currentUser: User | null = null;

export function login(email: string, password: string): User | null {
  const user = USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );
  currentUser = user ?? null;
  return currentUser;
}

export function signup(name: string, email: string, password: string): User {
  const user: User = { name: name.trim(), email: email.trim(), password };
  USERS.push(user);
  currentUser = user;
  return user;
}

export function logout(): void {
  currentUser = null;
}

export function saveProfile(updates: Partial<User>): User | null {
  if (!currentUser) return null;
  currentUser = { ...currentUser, ...updates };
  const idx = USERS.findIndex((u) => u.email === currentUser!.email);
  if (idx >= 0) USERS[idx] = currentUser;
  return currentUser;
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
  },
  {
    id: "noah",
    name: "Dr. Noah Patel",
    specialty: "Cosmetic dermatology",
    treatmentIds: ["microneedling", "botox"],
  },
  {
    id: "mia",
    name: "Dr. Mia Rossi",
    specialty: "Skin rejuvenation",
    treatmentIds: ["chemical-peel", "hydrafacial", "botox"],
  },
  {
    id: "liam",
    name: "Dr. Liam Kim",
    specialty: "Dermatologic surgery",
    treatmentIds: ["microneedling", "dermaplaning", "hydrafacial"],
  },
];

export const TIME_SLOTS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

export interface BookedSlot {
  doctorId: string;
  // ponytail: offset from today (0..6). Swap for absolute dates with a backend.
  dayOffset: number;
  time: string;
}

export interface DoctorOffDay {
  doctorId: string;
  dayOffset: number;
}

// ponytail: dummy bookings in memory; reload resets.
export const BOOKED_SLOTS: BookedSlot[] = [
  // Dr. Ava Chen — day 1 fully booked, day 3 morning taken.
  ...TIME_SLOTS.map((time) => ({ doctorId: "ava", dayOffset: 1, time })),
  { doctorId: "ava", dayOffset: 3, time: "09:00" },
  // Dr. Noah Patel — day 4 afternoon taken.
  { doctorId: "noah", dayOffset: 4, time: "15:00" },
  { doctorId: "noah", dayOffset: 4, time: "16:30" },
];

// Whole days off (break / leave). A day with no slots left is also hidden by the UI.
export const DOCTOR_OFF_DAYS: DoctorOffDay[] = [
  { doctorId: "noah", dayOffset: 2 },
  { doctorId: "mia", dayOffset: 0 },
  { doctorId: "mia", dayOffset: 1 },
  // Dr. Liam Kim — off the whole week: demonstrates the "not available" notice.
  ...Array.from({ length: 7 }, (_, dayOffset) => ({ doctorId: "liam", dayOffset })),
];
