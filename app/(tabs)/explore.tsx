import React from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useExpenses } from '@/components/ExpenseContext';
import { BarChart, PieChart } from 'react-native-chart-kit';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

interface ExpenseData {
  [key: string]: number;
}

interface PieChartData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

// Function to generate unique colors
const generateColors = (numColors: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 137.508) % 360; // use golden angle approximation
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

const ReportsScreen: React.FC = () => {
  const { expenses } = useExpenses();

  const data: ExpenseData = expenses.reduce((acc: ExpenseData, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
      },
    ],
  };

  const colors = generateColors(Object.keys(data).length);

  const pieChartData: PieChartData[] = Object.keys(data).map((key, index) => ({
    name: key,
    amount: data[key],
    color: colors[index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image source={require('@/assets/images/reports.jpg')} style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          EXPENSE REPORTS
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 26}
          height={250}
          yAxisLabel="₵ "
          chartConfig={{
            backgroundColor: '#2980b9',
            backgroundGradientFrom: '#3498db',
            backgroundGradientTo: '#2ecc71',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              elevation: 5, // Added elevation for a modern look
            },
          }}
          style={styles.chart}
        />

        <PieChart
          data={pieChartData}
          width={Dimensions.get('window').width - 16}
          height={240}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerImage: {
    height: 250,
    width: '100%',
    borderBottomLeftRadius: 25,  // Rounded bottom corners for header image
    borderBottomRightRadius: 25,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  chart: {
    marginVertical: 12,
    borderRadius: 16,
    elevation: 3,  // Shadow for the chart containers
    padding: 10,
  },
});

export default ReportsScreen;
