import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../lib/api';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      await api.signup({ name, email, password, gender });
      navigation.replace('Login');
    } catch (err) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setGender('male')} style={[styles.genderBtn, gender === 'male' && styles.genderBtnActive]}>
          <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('female')} style={[styles.genderBtn, gender === 'female' && styles.genderBtnActive]}>
          <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>Female</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#f43f5e', borderRadius: 8, padding: 14, width: '100%', alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginBottom: 12 },
  link: { color: '#f43f5e', marginTop: 8 },
  genderBtn: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginRight: 8 },
  genderBtnActive: { backgroundColor: '#f43f5e', borderColor: '#f43f5e' },
  genderText: { color: '#222' },
  genderTextActive: { color: '#fff', fontWeight: 'bold' },
}); 