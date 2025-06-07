import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CheckBox from '../checkbox';
import Checkbox from 'expo-checkbox';

const TermsModal = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (checked) {
      setVisible(false);
    }
  }, [checked]);

  return visible ? (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.modalText}>
            {`Terms and Conditions Last Updated: 19/03/2025 \n\n 1. Introduction: Welcome to Knowledge Temple! These Terms & Conditions ("Terms") govern your access to and use of our online learning platform, website, mobile applications, and related services (collectively, the "Platform"). By registering, accessing, or using our services, you acknowledge that you have read, understood,  and agreed to these Terms. If you do not agree with these Terms, please do not use the platform. \n\n 2. User Eligibility: You must provide accurate and complete information when registering for an account. Knowledge Temple reserves the right to deny access or terminate accounts that provide false or misleading information. \n\n3. Account Registration and Security • Users must create an account to access certain features of the platform. • You are responsible for maintaining the security of your login credentials. • You agree not to share your account with others or allow unauthorized access. • If you suspect unauthorized use of your account, notify us immediately at [ktemple1412@gmail.com]. \n\n4. Use of Services By using Knowledge Temple, you agree: • To use the platform for educational and personal development purposes only. • Not to engage in plagiarism, cheating, or academic dishonesty. • Not to distribute, reproduce, or sell course content without permission. • Not to use automated bots, scraping tools, or exploit the platform in any way. • Not to post, upload, or share content that is illegal, offensive, defamatory, or violates intellectual property rights. Failure to comply may result in suspension or termination of your account. \n\n5. Payments, Subscriptions, and Refunds \n\n5.1 Pricing & Payment • Some courses and features may require payment. Prices are displayed before checkout. • Payments can be made via credit/debit cards, UPI, PayPal, or other supported methods. • All transactions are final unless a refund is granted under our refund policy. \n\n5.2 Subscription Plans • If you purchase a subscription, it will automatically renew unless cancel before the renewal date. • You can cancel your subscription anytime via the account settings. \n\n5.3 Refund Policy • Refunds are granted only under specific conditions, such as: • Course access issues due to a platform error. Incorrect charges or duplicate transactions. Refund requests can be submitted at [ktemple1412@gmail.com]. \n\n6. Intellectual Property Rights • All content, including videos, PDFs, quizzes, and graphics, is owned by Knowledge Temple or its licensors. • You are granted a limited, non-transferable, non-exclusive license to access the content. • You may not modify, distribute, reproduce, or publicly display content without written permission. • Unauthorized use of content will result in legal action. \n\n7. User Conduct and Community Guidelines To maintain a safe learning environment, users must not: • Harass, threaten, or discriminate against others. • Share misleading or false information. • Attempt to hack, disrupt, or damage the platform. • Impersonate any individual or organization. Violation of these rules may lead to account suspension or legal action. \n\n8. Third-Party Content and External Links • Some courses may include links to third-party websites or resources. • We are not responsible for the accuracy, safety, or policies of third-party content. • Users should review third-party terms before engaging with external sites. \n\n9. Limitation of Liability: • Knowledge Temple is not responsible for any direct, indirect, incidental, or consequential damages. • We do not guarantee uninterrupted access due to technical issues, server downtimes, or maintenance. • We are not liable for data loss, cybersecurity threats, or unauthorized account access. \n\n10. Privacy Policy • We collect and store personal data as outlined in our Privacy Policy. • Your data will not be sold or shared with third parties without consent, except as required by law. • By using the platform, you consent to data collection as per our policy. \n\n11. Modification of Terms • We may update these Terms from time to time. • Users will be notified of significant changes via email or platform announcements. • Continued use of the platform after changes implies acceptance of the new Terms. \n\n13. Governing Law & Dispute Resolution • These Terms are governed by the laws of India. • Disputes will be resolved through arbitration or legal proceedings as per applicable law. \n\n14. Contact Us If you have any questions, concerns, or feedback, please contact us at: 📧 [ktemple1412@gmail.com] 📞 [8200319401]`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
              marginBottom: 10,
            }}
          >
            <Checkbox
              onValueChange={(value) => setChecked(value)}
              value={checked}
            />
            <Text>Accept Terms and Conditions</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  ) : null;
};

export default TermsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  modalView: {
    marginHorizontal: 20,
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 12,
    textAlign: 'left',
  },
});
