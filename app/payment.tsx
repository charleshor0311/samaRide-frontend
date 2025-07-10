import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { ArrowLeft, CreditCard, DollarSign, Plus, Wallet, CircleCheck as CheckCircle, History } from 'lucide-react-native';

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('touchngo');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [walletBalance, setWalletBalance] = useState(45.50);

  const paymentMethods = [
    {
      id: 'touchngo',
      name: 'Touch \'n Go eWallet',
      icon: '💳',
      balance: 'RM 125.50',
      primary: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      balance: '•••• 1234',
      primary: false
    },
    {
      id: 'bank',
      name: 'Online Banking',
      icon: '🏦',
      balance: 'Multiple banks',
      primary: false
    }
  ];

  const quickTopUpAmounts = [10, 20, 50, 100];

  const recentTransactions = [
    {
      id: '1',
      type: 'topup',
      description: 'Wallet Top-up',
      amount: 50,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'ride',
      description: 'Ride to Sunway Pyramid',
      amount: -15,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'ride',
      description: 'Ride to KLCC',
      amount: -22,
      date: '2024-01-13',
      status: 'completed'
    }
  ];

  const handleTopUp = () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const amount = parseFloat(topUpAmount);
    setWalletBalance(prev => prev + amount);
    setTopUpAmount('');
    
    Alert.alert('Success', `RM ${amount.toFixed(2)} has been added to your wallet`);
  };

  const handleQuickTopUp = (amount: number) => {
    setTopUpAmount(amount.toString());
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563EB', '#1D4ED8']}
        style={styles.header}
      >
        <Animatable.View animation="fadeInDown" delay={200} style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Payment & Wallet</Text>
        </Animatable.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Wallet Balance */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Wallet size={32} color="#2563EB" />
            <Text style={styles.walletTitle}>SamaRide Wallet</Text>
          </View>
          <Text style={styles.walletBalance}>RM {walletBalance.toFixed(2)}</Text>
          <Text style={styles.walletDescription}>Available balance for rides</Text>
        </Animatable.View>

        {/* Top Up Section */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.section}>
          <Text style={styles.sectionTitle}>Top Up Wallet</Text>
          
          <View style={styles.topUpContainer}>
            <View style={styles.inputContainer}>
              <DollarSign size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor="#9CA3AF"
                value={topUpAmount}
                onChangeText={setTopUpAmount}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.quickAmounts}>
              {quickTopUpAmounts.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.quickAmountButton,
                    topUpAmount === amount.toString() && styles.quickAmountButtonActive
                  ]}
                  onPress={() => handleQuickTopUp(amount)}
                >
                  <Text style={[
                    styles.quickAmountText,
                    topUpAmount === amount.toString() && styles.quickAmountTextActive
                  ]}>
                    RM {amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.topUpButton}
              onPress={handleTopUp}
            >
              <Plus size={20} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.topUpButtonText}>Top Up Now</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Payment Methods */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedMethod === method.id && styles.paymentMethodActive
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.paymentMethodLeft}>
                  <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
                  <View>
                    <Text style={styles.paymentMethodName}>{method.name}</Text>
                    <Text style={styles.paymentMethodBalance}>{method.balance}</Text>
                  </View>
                </View>
                {selectedMethod === method.id && (
                  <CheckCircle size={20} color="#2563EB" />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.addPaymentMethod}>
              <Plus size={20} color="#2563EB" />
              <Text style={styles.addPaymentMethodText}>Add Payment Method</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Recent Transactions */}
        <Animatable.View animation="fadeInUp" delay={700} style={styles.section}>
          <View style={styles.transactionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <History size={20} color="#2563EB" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.transactions}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transaction}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    transaction.type === 'topup' ? styles.topupIcon : styles.rideIcon
                  ]}>
                    {transaction.type === 'topup' ? (
                      <Plus size={16} color="#16A34A" />
                    ) : (
                      <CreditCard size={16} color="#EF4444" />
                    )}
                  </View>
                  <View>
                    <Text style={styles.transactionDescription}>{transaction.description}</Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount
                ]}>
                  {transaction.amount > 0 ? '+' : ''}RM {Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </Animatable.View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: -10,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  walletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginLeft: 12,
  },
  walletBalance: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
    marginBottom: 8,
  },
  walletDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  topUpContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickAmountButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  quickAmountText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  quickAmountTextActive: {
    color: '#FFFFFF',
  },
  topUpButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  topUpButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  paymentMethods: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  paymentMethodActive: {
    backgroundColor: '#EBF4FF',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  paymentMethodName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  paymentMethodBalance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  addPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  addPaymentMethodText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
    marginLeft: 8,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  transactions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topupIcon: {
    backgroundColor: '#DCFCE7',
  },
  rideIcon: {
    backgroundColor: '#FEE2E2',
  },
  transactionDescription: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  positiveAmount: {
    color: '#16A34A',
  },
  negativeAmount: {
    color: '#EF4444',
  },
});