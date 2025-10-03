import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [error, setError] = useState('');

  // Função para formatar o CEP enquanto o usuário digita
  const formatCep = (text) => {
    // Remove tudo que não é número
    const numericCep = text.replace(/\D/g, '');
    
    // Limita a 8 dígitos
    const limitedCep = numericCep.slice(0, 8);
    
    // Adiciona o hífen após o 5º dígito
    if (limitedCep.length > 5) {
      return `${limitedCep.slice(0, 5)}-${limitedCep.slice(5)}`;
    }
    
    return limitedCep;
  };

  // Função para validar CEP
  const validateCep = (cepValue) => {
    const numericCep = cepValue.replace(/\D/g, '');
    return numericCep.length === 8;
  };

  // Função para consultar o CEP na API
  const handleSearchCep = async () => {
    // Limpa resultados anteriores
    setError('');
    setAddressData(null);

    // Valida o CEP
    if (!validateCep(cep)) {
      setError('Por favor, insira um CEP válido com 8 dígitos.');
      return;
    }

    // Remove formatação do CEP
    const numericCep = cep.replace(/\D/g, '');

    setLoading(true);

    try {
      // Fazendo requisição para a API ViaCEP (gratuita e sem necessidade de token)
      const response = await axios.get(`https://viacep.com.br/ws/${numericCep}/json/`);
      
      // Verifica se o CEP foi encontrado
      if (response.data.erro) {
        setError('CEP não encontrado. Por favor, verifique o CEP digitado.');
        setAddressData(null);
      } else {
        setAddressData(response.data);
        setError('');
      }
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
      setError('Erro ao consultar o CEP. Verifique sua conexão e tente novamente.');
      setAddressData(null);
    } finally {
      setLoading(false);
    }
  };

  // Função para limpar o formulário
  const handleClear = () => {
    setCep('');
    setAddressData(null);
    setError('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Consulta de CEP</Text>
          <Text style={styles.subtitle}>Digite um CEP para buscar o endereço</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>CEP:</Text>
          <TextInput
            style={styles.input}
            placeholder="00000-000"
            value={cep}
            onChangeText={(text) => setCep(formatCep(text))}
            keyboardType="numeric"
            maxLength={9}
            editable={!loading}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.searchButton, loading && styles.buttonDisabled]}
              onPress={handleSearchCep}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Buscar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.clearButton]}
              onPress={handleClear}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Indicador de carregamento */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Buscando informações...</Text>
          </View>
        )}

        {/* Mensagem de erro */}
        {error !== '' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Exibição dos dados do endereço */}
        {addressData && !loading && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Informações do Endereço</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CEP:</Text>
              <Text style={styles.infoValue}>{addressData.cep}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Logradouro:</Text>
              <Text style={styles.infoValue}>
                {addressData.logradouro || 'Não informado'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Complemento:</Text>
              <Text style={styles.infoValue}>
                {addressData.complemento || 'Não informado'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Bairro:</Text>
              <Text style={styles.infoValue}>
                {addressData.bairro || 'Não informado'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cidade:</Text>
              <Text style={styles.infoValue}>
                {addressData.localidade || 'Não informado'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Estado:</Text>
              <Text style={styles.infoValue}>
                {addressData.uf || 'Não informado'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>IBGE:</Text>
              <Text style={styles.infoValue}>
                {addressData.ibge || 'Não informado'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>DDD:</Text>
              <Text style={styles.infoValue}>
                {addressData.ddd || 'Não informado'}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#6c757d',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#fee',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  errorText: {
    flex: 1,
    fontSize: 15,
    color: '#721c24',
    lineHeight: 22,
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    width: 110,
  },
  infoValue: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
});
