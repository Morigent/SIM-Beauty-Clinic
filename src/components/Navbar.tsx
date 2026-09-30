import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { styles, colors, fonts, spacing, fontSize, radius } from '../app/theme/style';

interface NavItem {
  key: string;
  label: string;
}

export interface NavbarProps {
  activeKey?: string;
  onNavPress?: (key: string) => void;
  onSignInPress?: () => void;
  brandName?: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home' },
  { key: 'our-service', label: 'Our Service' },
  { key: 'testimonial', label: 'Testimonial' },
  { key: 'special-offer', label: 'Special Offer' },
  { key: 'contact', label: 'Contact' },
];

const DESKTOP_BREAKPOINT = 768;

function NavLink({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={navStyles.linkPressable}
      accessibilityRole="menuitem"
    >
      <Text style={[navStyles.linkText, isActive && navStyles.linkTextActive, hovered && !isActive && navStyles.linkTextHovered]}>
        {label}
      </Text>
      <View style={[navStyles.linkUnderline, (isActive || hovered) && navStyles.linkUnderlineVisible]} />
    </Pressable>
  );
}

function MobileMenuItem({ label, isActive, isLast, onPress }: { label: string; isActive: boolean; isLast: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [navStyles.mobileMenuItem, !isLast && navStyles.mobileMenuItemBorder, pressed && { backgroundColor: colors.creamDeep }]}
      accessibilityRole="menuitem"
    >
      <View style={[navStyles.mobileMenuDot, isActive && navStyles.mobileMenuDotActive]} />
      <Text style={[navStyles.mobileMenuText, isActive && navStyles.mobileMenuTextActive]}>{label}</Text>
    </Pressable>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <View style={hamburgerStyles.root}>
      <View style={[hamburgerStyles.bar, open && hamburgerStyles.bar1Open]} />
      <View style={[hamburgerStyles.bar, open && hamburgerStyles.barMidOpen]} />
      <View style={[hamburgerStyles.bar, open && hamburgerStyles.bar3Open]} />
    </View>
  );
}

const hamburgerStyles = StyleSheet.create({
  root: { width: 22, height: 16, justifyContent: 'space-between' },
  bar: { height: 2, borderRadius: 1, backgroundColor: colors.inkSoft },
  bar1Open: { transform: [{ rotate: '45deg' }, { translateY: 7 }] },
  barMidOpen: { opacity: 0 },
  bar3Open: { transform: [{ rotate: '-45deg' }, { translateY: -7 }] },
});

export default function Navbar({ activeKey = 'home', onNavPress, onSignInPress, brandName = 'LuxeDerm' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  const handleNavPress = (key: string) => {
    onNavPress?.(key);
    setMenuOpen(false);
  };

  return (
    <View style={navStyles.wrapper}>
      <View style={[styles.navbar, navStyles.bar]}>
        <View style={styles.navLogoBlock}>
          <Text style={styles.navLogo}>{brandName}</Text>
        </View>
        {isDesktop && (
          <View style={navStyles.desktopLinks}>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.key} label={item.label} isActive={activeKey === item.key} onPress={() => handleNavPress(item.key)} />
            ))}
          </View>
        )}
        <View style={navStyles.rightControls}>
          <Pressable onPress={onSignInPress} style={({ pressed }) => [navStyles.signInBtn, pressed && navStyles.signInBtnPressed]} accessibilityRole="button" accessibilityLabel="Sign in">
            <Text style={navStyles.signInText}>Sign In</Text>
          </Pressable>
          {!isDesktop && (
            <Pressable onPress={() => setMenuOpen((v) => !v)} style={navStyles.hamburger} accessibilityRole="button" accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}>
              <HamburgerIcon open={menuOpen} />
            </Pressable>
          )}
        </View>
      </View>
      {menuOpen && !isDesktop && (
        <View style={navStyles.mobileMenu}>
          {NAV_ITEMS.map((item, idx) => (
            <MobileMenuItem key={item.key} label={item.label} isActive={activeKey === item.key} isLast={idx === NAV_ITEMS.length - 1} onPress={() => handleNavPress(item.key)} />
          ))}
          <Pressable onPress={() => { onSignInPress?.(); setMenuOpen(false); }} style={({ pressed }) => [navStyles.mobileSignInBtn, pressed && { opacity: 0.8 }]}>
            <Text style={navStyles.mobileSignInText}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const navStyles = StyleSheet.create({
  wrapper: { backgroundColor: colors.cream, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line, zIndex: 100 },
  bar: { flexDirection: 'row', alignItems: 'center' },
  brandBlock: { backgroundColor: colors.tan, justifyContent: 'center', alignItems: 'center', borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: colors.line },
  brandText: { fontFamily: fonts.heading, fontSize: 64, color: colors.white, letterSpacing: 0.5 },
  desktopLinks: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, overflow: 'hidden' },
  linkPressable: { marginRight: spacing.xl, paddingVertical: spacing.sm, alignItems: 'center' },
  linkText: { fontFamily: fonts.body, fontSize: fontSize.small, color: colors.body },
  linkTextActive: { fontFamily: fonts.bodyMedium, color: colors.inkSoft },
  linkTextHovered: { color: colors.tanDark },
  linkUnderline: { marginTop: 3, height: 1.5, width: '100%', backgroundColor: colors.tan, opacity: 0 },
  linkUnderlineVisible: { opacity: 1 },
  rightControls: { flexDirection: 'row', alignItems: 'center', paddingRight: spacing.lg, gap: spacing.md },
  signInBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tan, paddingVertical: 8, paddingHorizontal: 20, borderWidth: 1, borderColor: colors.ink, borderBottomWidth: 3, borderRadius: radius.sm },
  signInBtnPressed: { borderBottomWidth: 1, transform: [{ translateY: 2 }] },
  signInText: { fontFamily: fonts.bodyMedium, fontSize: fontSize.small, color: colors.white },
  hamburger: { padding: spacing.sm, borderRadius: radius.sm },
  mobileMenu: { backgroundColor: colors.cream, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line, paddingTop: spacing.sm, paddingBottom: spacing.md, paddingHorizontal: spacing.lg },
  mobileMenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: spacing.sm },
  mobileMenuItemBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  mobileMenuDot: { width: 6, height: 6, borderRadius: radius.pill, backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.muted, marginRight: spacing.md },
  mobileMenuDotActive: { backgroundColor: colors.tan, borderColor: colors.tan },
  mobileMenuText: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.body },
  mobileMenuTextActive: { fontFamily: fonts.bodyMedium, color: colors.inkSoft },
  mobileSignInBtn: { marginTop: spacing.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tan, paddingVertical: 12, borderWidth: 1, borderColor: colors.ink, borderBottomWidth: 3, borderRadius: radius.sm },
  mobileSignInText: { fontFamily: fonts.bodyMedium, fontSize: fontSize.base, color: colors.white },
});
