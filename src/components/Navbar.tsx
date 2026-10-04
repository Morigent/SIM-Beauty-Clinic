import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { styles, colors } from '../theme/style';

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
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.85, useNativeDriver: true, speed: 30, bounciness: 10 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 14 }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={styles.navLinkPressable}
      accessibilityRole="menuitem"
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={[styles.navLink, isActive && styles.navLinkActive, hovered && !isActive && styles.navLinkHovered]}>
          {label}
        </Text>
        <View style={[styles.navLinkUnderline, (isActive || hovered) && styles.navLinkUnderlineVisible]} />
      </Animated.View>
    </Pressable>
  );
}

function MobileMenuItem({ label, isActive, isLast, onPress }: { label: string; isActive: boolean; isLast: boolean; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, speed: 30, bounciness: 8 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 12 }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [styles.navMobileMenuItem, !isLast && styles.navMobileMenuItemBorder, pressed && { backgroundColor: colors.creamDeep }]}
      accessibilityRole="menuitem"
    >
      <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ scale }] }}>
        <View style={[styles.navMobileMenuDot, isActive && styles.navMobileMenuDotActive]} />
        <Text style={[styles.navMobileMenuText, isActive && styles.navMobileMenuTextActive]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <View style={styles.navHamburgerRoot}>
      <View style={[styles.navHamburgerBar, open && styles.navHamburgerBar1Open]} />
      <View style={[styles.navHamburgerBar, open && styles.navHamburgerBarMidOpen]} />
      <View style={[styles.navHamburgerBar, open && styles.navHamburgerBar3Open]} />
    </View>
  );
}

export default function Navbar({ activeKey = 'home', onNavPress, onSignInPress, brandName = 'LuxeDerm' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  const handleNavPress = (key: string) => {
    onNavPress?.(key);
    setMenuOpen(false);
  };

  return (
    <View style={styles.navWrapper}>
      <View style={styles.navbar}>
        <View style={styles.navLogoBlock}>
          <Text style={styles.navLogo}>{brandName}</Text>
        </View>
        {isDesktop && (
          <View style={styles.navLinks}>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.key} label={item.label} isActive={activeKey === item.key} onPress={() => handleNavPress(item.key)} />
            ))}
          </View>
        )}
        <View style={styles.navRightControls}>
          <Pressable onPress={onSignInPress} style={({ pressed }) => [styles.navSignInBtn, pressed && styles.navSignInBtnPressed]} accessibilityRole="button" accessibilityLabel="Sign in">
            <Text style={styles.navSignInText}>Sign In</Text>
          </Pressable>
          {!isDesktop && (
            <Pressable onPress={() => setMenuOpen((v) => !v)} style={styles.navHamburger} accessibilityRole="button" accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}>
              <HamburgerIcon open={menuOpen} />
            </Pressable>
          )}
        </View>
      </View>
      {menuOpen && !isDesktop && (
        <View style={styles.navMobileMenu}>
          {NAV_ITEMS.map((item, idx) => (
            <MobileMenuItem key={item.key} label={item.label} isActive={activeKey === item.key} isLast={idx === NAV_ITEMS.length - 1} onPress={() => handleNavPress(item.key)} />
          ))}
          <Pressable onPress={() => { onSignInPress?.(); setMenuOpen(false); }} style={({ pressed }) => [styles.navMobileSignInBtn, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navMobileSignInText}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
