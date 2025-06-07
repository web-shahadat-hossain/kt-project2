import Toast from 'react-native-simple-toast';

export const showToast = (title: string, variant?: string) => {
  console.log('showToast', title, variant);
  if (!title) return null;
  return Toast.show(title, Toast.LONG, {
    backgroundColor: variant === 'error' ? 'red' : 'green',
    textColor: 'wthite',
  });
};
