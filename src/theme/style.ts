// luxedermStyles.js
// React Native stylesheet for the "LuxeDerm" beauty landing page.
// NOTE: hex values are visual estimates from the design screenshot.
// Verify with an eyedropper / Figma and tweak in `colors` only — every style below reads from it.

import { StyleSheet, Platform } from 'react-native';

/* ------------------------------------------------------------------ */
/* 1. DESIGN TOKENS                                                    */
/* ------------------------------------------------------------------ */

export const colors = {
  // surfaces
  cream: '#F6F1EB',        // page + section background
  creamDeep: '#EFE5DD',    // FAQ open item, subtle panels
  blush: '#E9D0C4',        // image backdrops, arch cards, hero right block
  blushSoft: '#F1DFD6',    // lighter blush (pricing card footer wash)
  white: '#FFFFFF',        // testimonial / FAQ cards

  // brand
  tan: '#C4A67E',          // hero side rail, primary CTA, featured plan button
  tanDark: '#B08F63',      // CTA pressed / icon accent
  gold: '#C9A772',         // bullet dots, check icons

  // ink
  ink: '#34342C',          // card "hard shadow" borders, headings, sparkle icon
  inkSoft: '#2B2B27',      // primary headline text
  body: '#6B645D',         // paragraph text
  muted: '#9A928A',        // captions, meta labels
  line: '#5C4B3B',         // thin brown outlines / dividers

  transparent: 'transparent',
};

export const fonts = {
  // Suggested: Marcellus (headings) + Jost (body). Swap for whatever you load with expo-font.
  heading: Platform.select({ ios: 'Marcellus-Regular', android: 'Marcellus-Regular', default: 'serif' }),
  body: Platform.select({ ios: 'Jost-Regular', android: 'Jost-Regular', default: 'System' }),
  bodyMedium: Platform.select({ ios: 'Jost-Medium', android: 'Jost-Medium', default: 'System' }),
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, section: 48 };

export const radius = { sm: 4, md: 8, pill: 999, arch: 999 };

export const fontSize = {
  caption: 12,
  small: 14,
  body: 15,
  base: 16,
  h3: 20,
  h2: 30,
  h1: 38,
  price: 32,
};

/* ------------------------------------------------------------------ */
/* 2. HELPERS                                                          */
/* ------------------------------------------------------------------ */

// The design uses a flat, hard offset shadow (thick dark bottom edge) on cards/buttons.
// RN can't do blur-less offset shadows on Android, so we fake it with a thicker bottom border.
const hardShadowCard = {
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: colors.ink,
  borderBottomWidth: 4,
  borderRadius: radius.md,
};

/* ------------------------------------------------------------------ */
/* 3. STYLES                                                           */
/* ------------------------------------------------------------------ */

export const styles = StyleSheet.create({
  /* ---------- Global ---------- */
  screen: { flex: 1, backgroundColor: colors.cream },
  section: {
    paddingVertical: spacing.section,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.cream,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: fontSize.h2,
    color: colors.inkSoft,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    fontFamily: fonts.body,
    fontSize: fontSize.base,
    lineHeight: 22,
    color: colors.body,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  bodyText: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    lineHeight: 20,
    color: colors.body,
  },

  /* ---------- Buttons ---------- */
  buttonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.tan,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 4,
    borderRadius: radius.sm,
  },
  buttonPrimaryText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.small,
    color: colors.white,
    marginRight: spacing.sm,
  },
  buttonBlush: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blush,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 4,
    borderRadius: radius.sm,
  },
  buttonBlushText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.small,
    color: colors.inkSoft,
  },

  /* ---------- Navbar ---------- */
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    backgroundColor: colors.cream,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
    
  },
  navLogoBlock: {
    paddingHorizontal: spacing.xl,
    height: '100%',
    backgroundColor: colors.tan,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.line,
  },
  navLogo: { fontFamily: fonts.heading, fontSize: 18, color: colors.white, letterSpacing: 0.5 },
  navWrapper: { backgroundColor: colors.cream, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line, zIndex: 100 },
  navLinks: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, overflow: 'hidden' },
  navLinkPressable: { marginRight: spacing.xl, paddingVertical: spacing.sm, alignItems: 'center' },
  navLink: { fontFamily: fonts.body, fontSize: fontSize.small, color: colors.body },
  navLinkActive: { fontFamily: fonts.bodyMedium, color: colors.inkSoft },
  navLinkHovered: { color: colors.tanDark },
  navLinkUnderline: { marginTop: 3, height: 1.5, width: '100%', backgroundColor: colors.tan, opacity: 0 },
  navLinkUnderlineVisible: { opacity: 1 },
  navRightControls: { flexDirection: 'row', alignItems: 'center', paddingRight: spacing.lg, gap: spacing.md },
  navSignInBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tan, paddingVertical: 8, paddingHorizontal: 20, borderWidth: 1, borderColor: colors.ink, borderBottomWidth: 3, borderRadius: radius.sm },
  navSignInBtnPressed: { borderBottomWidth: 1, transform: [{ translateY: 2 }] },
  navSignInText: { fontFamily: fonts.bodyMedium, fontSize: fontSize.small, color: colors.white },
  navHamburger: { padding: spacing.sm, borderRadius: radius.sm },
  navHamburgerRoot: { width: 22, height: 16, justifyContent: 'space-between' },
  navHamburgerBar: { height: 2, borderRadius: 1, backgroundColor: colors.inkSoft },
  navHamburgerBar1Open: { transform: [{ rotate: '45deg' }, { translateY: 7 }] },
  navHamburgerBarMidOpen: { opacity: 0 },
  navHamburgerBar3Open: { transform: [{ rotate: '-45deg' }, { translateY: -7 }] },
  navMobileMenu: { backgroundColor: colors.cream, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line, paddingTop: spacing.sm, paddingBottom: spacing.md, paddingHorizontal: spacing.lg },
  navMobileMenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: spacing.sm },
  navMobileMenuItemBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  navMobileMenuDot: { width: 6, height: 6, borderRadius: radius.pill, backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.muted, marginRight: spacing.md },
  navMobileMenuDotActive: { backgroundColor: colors.tan, borderColor: colors.tan },
  navMobileMenuText: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.body },
  navMobileMenuTextActive: { fontFamily: fonts.bodyMedium, color: colors.inkSoft },
  navMobileSignInBtn: { marginTop: spacing.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tan, paddingVertical: 12, borderWidth: 1, borderColor: colors.ink, borderBottomWidth: 3, borderRadius: radius.sm },
  navMobileSignInText: { fontFamily: fonts.bodyMedium, fontSize: fontSize.base, color: colors.white },

  /* ---------- Hero ---------- */
  hero: { flexDirection: 'row', minHeight: 560, backgroundColor: colors.cream },
  heroRail: {
    width: 56,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.line,
  },
  heroContent: { flex: 1, paddingTop: spacing.xxl, paddingHorizontal: spacing.lg },
  heroTitle: {
    fontFamily: fonts.heading,
    fontSize: fontSize.h1,
    lineHeight: 42,
    color: colors.inkSoft,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'flex-start',
    marginTop: 30
  },
  heroPlayWrap: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlayButton: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroQuote: {
    fontFamily: fonts.heading,
    fontSize: 15,
    lineHeight: 22,
    color: colors.body,
    marginVertical: spacing.lg,
  },
  heroImageBlock: { width: 320, height: 320, backgroundColor: colors.blush, borderRadius: 12 },
  heroSparkle: { position: 'absolute', top: 88, right: 40, tintColor: colors.ink },
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.cream,
    marginRight: -8,
  },
  avatarCaption: { fontFamily: fonts.body, fontSize: fontSize.caption, color: colors.muted, marginLeft: spacing.lg },

  /* ---------- Marquee strip ---------- */
  marquee: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.cream,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  marqueeText: { fontFamily: fonts.heading, fontSize: 18, color: colors.inkSoft, marginRight: spacing.xl },

  /* ---------- About ---------- */
  aboutArch: {
    width: '48%',
    aspectRatio: 0.8,
    backgroundColor: colors.blush,
    borderTopLeftRadius: radius.arch,
    borderTopRightRadius: radius.arch,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  aboutTitle: { fontFamily: fonts.heading, fontSize: 20, color: colors.inkSoft, marginBottom: spacing.md },
  aboutRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  aboutBullet: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
    marginTop: 6,
    marginRight: spacing.sm,
  },

  /* ---------- Services ---------- */
  serviceCard: { ...hardShadowCard, width: 150, marginRight: spacing.lg, padding: spacing.sm },
  serviceImage: { width: '100%', height: 190, borderRadius: radius.sm, backgroundColor: colors.blush },
  serviceLabel: {
    fontFamily: fonts.heading,
    fontSize: fontSize.base,
    color: colors.inkSoft,
    textAlign: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },

  /* ---------- Before / After ---------- */
  baFrame: { ...hardShadowCard, padding: spacing.sm, backgroundColor: colors.cream },
  baSliderHandle: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baStatsRow: { flexDirection: 'row', marginTop: spacing.lg },
  baStat: {
    flex: 1,
    marginRight: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 3,
    borderRadius: radius.sm,
  },
  baStatNumber: { fontFamily: fonts.heading, fontSize: 16, color: colors.inkSoft },
  baStatLabel: { fontFamily: fonts.body, fontSize: fontSize.caption, color: colors.body },

  /* ---------- Testimonials ---------- */
  testimonialHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  testimonialHeaderText: { fontFamily: fonts.heading, fontSize: 18, color: colors.inkSoft, marginHorizontal: spacing.md },
  testimonialHeaderLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.line },
  testimonialCard: { ...hardShadowCard, width: 210, padding: spacing.lg, paddingTop: spacing.xxl, marginRight: spacing.lg },
  testimonialAvatar: {
    position: 'absolute',
    top: -18,
    left: '50%',
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.ink,
    backgroundColor: colors.blush,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  testimonialText: { fontFamily: fonts.body, fontSize: fontSize.small, lineHeight: 18, color: colors.body, textAlign: 'center' },
  testimonialAuthor: { fontFamily: fonts.bodyMedium, fontSize: fontSize.caption, color: colors.inkSoft, marginTop: spacing.md, textAlign: 'center' },
  testimonialService: { fontFamily: fonts.body, fontSize: fontSize.caption, color: colors.muted, textAlign: 'center' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.ink,
    backgroundColor: colors.transparent,
    marginHorizontal: 4,
  },
  dotActive: { backgroundColor: colors.ink },

  /* ---------- Pricing ---------- */
  pricingCard: {
    width: 230,
    marginRight: spacing.lg,
    backgroundColor: colors.cream,
    borderTopLeftRadius: radius.arch,
    borderTopRightRadius: radius.arch,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  pricingImageWrap: { height: 200, backgroundColor: colors.blush },
  pricingBody: { padding: spacing.lg },
  pricingName: { fontFamily: fonts.heading, fontSize: fontSize.h3, color: colors.inkSoft, textAlign: 'center' },
  pricingTagline: { fontFamily: fonts.body, fontSize: fontSize.caption, color: colors.muted, marginBottom: spacing.md, textAlign: 'center' },
  pricingFeatureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  pricingCheck: { color: colors.gold, marginRight: spacing.sm, fontSize: 12 },
  pricingFeatureText: { fontFamily: fonts.body, fontSize: fontSize.caption, color: colors.body },
  pricingIdeal: { fontFamily: fonts.body, fontSize: fontSize.caption, lineHeight: 15, color: colors.body, marginTop: spacing.sm },
  pricingPrice: { fontFamily: fonts.heading, fontSize: fontSize.price, color: colors.inkSoft, textAlign: 'center', marginVertical: spacing.lg },
  pricingButtonFeatured: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tan,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 4,
    borderRadius: radius.sm,
  },

  /* ---------- FAQ ---------- */
  faqItem: { ...hardShadowCard, paddingVertical: 14, paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  faqItemOpen: { backgroundColor: colors.creamDeep },
  faqRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQuestion: { fontFamily: fonts.heading, fontSize: fontSize.small, color: colors.inkSoft, flex: 1, paddingRight: spacing.md },
  faqAnswer: { fontFamily: fonts.body, fontSize: fontSize.caption, lineHeight: 16, color: colors.body, marginTop: spacing.sm },
  faqIcon: {
    width: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faqIconText: { color: colors.white, fontSize: 12, lineHeight: 14 },

  /* ---------- Blog / Insights ---------- */
  blogHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl },
  blogSeeAll: {
    backgroundColor: colors.blush,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 3,
    borderRadius: radius.sm,
  },
  blogFeatured: { ...hardShadowCard, backgroundColor: colors.blush, marginBottom: spacing.lg, overflow: 'hidden' },
  blogFeaturedTitle: { fontFamily: fonts.heading, fontSize: 18, lineHeight: 24, color: colors.inkSoft, padding: spacing.lg, paddingBottom: spacing.sm },
  blogRow: { ...hardShadowCard, flexDirection: 'row', marginBottom: spacing.md, overflow: 'hidden' },
  blogThumb: { width: 110, backgroundColor: colors.blush },
  blogRowBody: { flex: 1, padding: spacing.md, backgroundColor: colors.cream },
  blogRowTitle: { fontFamily: fonts.heading, fontSize: fontSize.small, color: colors.inkSoft, marginBottom: 4 },
  blogRowExcerpt: { fontFamily: fonts.body, fontSize: 9, lineHeight: 13, color: colors.body },
  blogReadMore: { fontFamily: fonts.bodyMedium, fontSize: 9, color: colors.inkSoft, marginTop: spacing.sm },

  /* ---------- Subscribe ---------- */
  subscribe: { alignItems: 'center', paddingVertical: spacing.section, paddingHorizontal: spacing.xl, backgroundColor: colors.cream },
  subscribeTitle: { fontFamily: fonts.heading, fontSize: 20, color: colors.inkSoft, textAlign: 'center' },
  subscribeSubtitle: { fontFamily: fonts.body, fontSize: fontSize.small, color: colors.body, textAlign: 'center', marginVertical: spacing.md },
  subscribeRow: { flexDirection: 'row', width: '100%', marginTop: spacing.md },
  subscribeInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.ink,
    borderRightWidth: 0,
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.inkSoft,
  },
  subscribeButton: { width: 56, height: 44, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  subscribeDisclaimer: { fontFamily: fonts.body, fontSize: 9, color: colors.muted, textAlign: 'center', marginTop: spacing.md },

  /* ---------- Contact ---------- */
  contactCard: { ...hardShadowCard, width: '100%', maxWidth: 520, padding: spacing.lg, marginTop: spacing.lg },
  contactLabel: { fontFamily: fonts.bodyMedium, fontSize: fontSize.small, color: colors.inkSoft, marginBottom: 4 },
  contactValue: { fontFamily: fonts.body, fontSize: fontSize.body, lineHeight: 20, color: colors.body, textAlign: 'center' },

  /* ---------- Footer ---------- */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.cream,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  footerLogo: { fontFamily: fonts.heading, fontSize: 16, color: colors.inkSoft },
  footerLinks: { flexDirection: 'row' },
  footerLink: { fontFamily: fonts.body, fontSize: fontSize.caption, color: colors.body, marginLeft: spacing.lg },
  footerCopy: { fontFamily: fonts.body, fontSize: 9, color: colors.muted, paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, backgroundColor: colors.cream },
});

export default styles;