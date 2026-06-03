import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppLayout from '@/components/layouts/AppLayout';
import { Colors } from '@/theme/colors';
import { useAppSelector } from '@/redux/hooks';

const translations = {
  en: {
    title: 'User Profile',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    memberSince: 'Member Since',
    valuationsCompleted: 'Valuations',
    savedReports: 'Saved Reports',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    valueMemberSince: 'June 2025',
  },
  de: {
    title: 'Benutzerprofil',
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    location: 'Standort',
    memberSince: 'Mitglied seit',
    valuationsCompleted: 'Bewertungen',
    savedReports: 'Berichte',
    editProfile: 'Profil bearbeiten',
    changePassword: 'Passwort ändern',
    valueMemberSince: 'Juni 2025',
  },
};

export default function Profile() {
  const lang = useAppSelector((state) => state.language.lang);
  const t = translations[lang];

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{t.title}</Text>

        {/* PROFILE HEADER CARD */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
            }}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Sarah Jenkins</Text>
          <Text style={styles.profileEmail}>sarah.j@example.com</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>14</Text>
              <Text style={styles.statLabel}>{t.valuationsCompleted}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNum}>3</Text>
              <Text style={styles.statLabel}>{t.savedReports}</Text>
            </View>
          </View>
        </View>

        {/* INFO FIELDS */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.name}</Text>
            <Text style={styles.infoValue}>Sarah Jenkins</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.email}</Text>
            <Text style={styles.infoValue}>sarah.j@example.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.phone}</Text>
            <Text style={styles.infoValue}>+49 176 12345678</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.location}</Text>
            <Text style={styles.infoValue}>München, DE</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.memberSince}</Text>
            <Text style={styles.infoValue}>{t.valueMemberSince}</Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
            <Text style={styles.primaryText}>{t.editProfile}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
            <Text style={styles.secondaryText}>{t.changePassword}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  pageTitle: {
    color: '#5a9e8e',
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#5a9e8e',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.foreground,
  },
  profileEmail: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 16,
    width: '100%',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5a9e8e',
  },
  statLabel: {
    fontSize: 10,
    color: Colors.dark.mutedForeground,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  infoSection: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
  },
  infoValue: {
    fontSize: 13,
    color: Colors.dark.foreground,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(90,158,142,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#080d12',
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.card,
  },
  secondaryText: {
    color: Colors.dark.foreground,
    fontSize: 12,
    fontWeight: '600',
  },
});
