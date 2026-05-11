import AppLayout from '@/components/layouts/AppLayout';
import { View, Text } from 'react-native';
import { Colors } from '@/theme/colors';

export default function Dashboard() {
  return (
    <AppLayout>
      <View>
        <Text style={{ color: Colors.dark.foreground }}>Dashboard</Text>
      </View>
    </AppLayout>
  );
}
