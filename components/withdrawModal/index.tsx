import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// Define interfaces for the form data and props
interface FormData {
  amount: string;
  accountType: 'bankTransfer' | 'vpa' | '';
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  vpa: string;
}

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const WithdrawModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  // State for each input field
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    accountType: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    vpa: '',
  });

  // Handle input changes
  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle account type selection
  const selectAccountType = (type: 'bankTransfer' | 'vpa'): void => {
    setFormData({
      ...formData,
      accountType: type,
    });
  };

  // Handle form submission
  const handleSubmit = (): void => {
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      amount: '',
      accountType: '',
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      vpa: '',
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardView}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.headerText}>Payment Details</Text>
                  <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Amount"
                      keyboardType="numeric"
                      value={formData.amount}
                      onChangeText={(text) => handleChange('amount', text)}
                    />
                  </View>

                  {/* Radio button selection for account type */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Account Type</Text>
                    <View style={styles.radioContainer}>
                      <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => selectAccountType('bankTransfer')}
                      >
                        <View style={styles.radioButton}>
                          {formData.accountType === 'bankTransfer' && (
                            <View style={styles.radioButtonSelected} />
                          )}
                        </View>
                        <Text style={styles.radioText}>Bank Transfer</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => selectAccountType('vpa')}
                      >
                        <View style={styles.radioButton}>
                          {formData.accountType === 'vpa' && (
                            <View style={styles.radioButtonSelected} />
                          )}
                        </View>
                        <Text style={styles.radioText}>VPA (UPI)</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Conditional rendering based on account type */}
                  {formData.accountType === 'bankTransfer' && (
                    <>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Account Holder Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Account Holder Name"
                          value={formData.accountHolderName}
                          onChangeText={(text) =>
                            handleChange('accountHolderName', text)
                          }
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Account Number</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Account Number"
                          keyboardType="numeric"
                          value={formData.accountNumber}
                          onChangeText={(text) =>
                            handleChange('accountNumber', text)
                          }
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>IFSC Code</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter IFSC Code"
                          autoCapitalize="characters"
                          value={formData.ifscCode}
                          onChangeText={(text) =>
                            handleChange('ifscCode', text)
                          }
                        />
                      </View>
                    </>
                  )}

                  {formData.accountType === 'vpa' && (
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>VPA (UPI ID)</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="example@upi"
                        keyboardType="email-address"
                        value={formData.vpa}
                        onChangeText={(text) => handleChange('vpa', text)}
                      />
                    </View>
                  )}
                </ScrollView>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      (!formData.accountType || !formData.amount) &&
                        styles.submitButtonDisabled,
                    ]}
                    onPress={handleSubmit}
                    disabled={!formData.accountType || !formData.amount}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    width: width * 0.9,
    maxHeight: height * 0.8,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  scrollContainer: {
    maxHeight: height * 0.5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#555',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WithdrawModal;
