# 📍 Consulta de CEP - React Native

Aplicativo mobile desenvolvido em React Native com Expo que permite consultar informações de endereço através do CEP utilizando a API ViaCEP.

## 📱 Sobre o Projeto

Este aplicativo foi desenvolvido como projeto acadêmico para a disciplina de Desenvolvimento para Dispositivos Móveis. Ele permite que os usuários consultem informações detalhadas de endereços brasileiros através do CEP.

### ✨ Funcionalidades

- ✅ Consulta de endereço por CEP
- ✅ Formatação automática do CEP durante a digitação
- ✅ Validação de CEP (8 dígitos)
- ✅ Indicador de carregamento durante a requisição
- ✅ Tratamento de erros (CEP inválido ou não encontrado)
- ✅ Exibição completa dos dados do endereço:
  - Logradouro
  - Complemento
  - Bairro
  - Cidade
  - Estado (UF)
  - Código IBGE
  - DDD
- ✅ Interface responsiva e amigável
- ✅ Botão para limpar o formulário

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **Axios** - Cliente HTTP para requisições à API
- **ViaCEP API** - API gratuita para consulta de CEPs

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) instalado no seu smartphone (iOS ou Android)

## 🔧 Instalação

1. **Clone o repositório ou navegue até a pasta do projeto**

```bash
cd "c:\Users\Renan Rocha\OneDrive\Documentos\Faculdade\6ºPeríodo\Desenvolvimento para Dispositivos Móveis\viaCep-api"
```

2. **Instale as dependências**

```bash
npm install
```

ou

```bash
yarn install
```

## ▶️ Como Executar

1. **Inicie o servidor de desenvolvimento**

```bash
npm start
```

ou

```bash
expo start
```

2. **Execute no dispositivo**

Após o servidor iniciar, você verá um QR Code no terminal:

- **Android**: Abra o aplicativo Expo Go e escaneie o QR Code
- **iOS**: Abra a câmera nativa do iPhone e escaneie o QR Code
- **Emulador Android**: Pressione `a` no terminal
- **Simulador iOS**: Pressione `i` no terminal (apenas macOS)
- **Web**: Pressione `w` no terminal

## 📖 Como Usar

1. Digite um CEP válido no campo de entrada (8 dígitos)
2. O CEP será formatado automaticamente (00000-000)
3. Clique no botão "Buscar"
4. Aguarde o carregamento
5. As informações do endereço serão exibidas na tela
6. Use o botão "Limpar" para fazer uma nova consulta

### Exemplos de CEPs para teste:

- `01310-100` - Avenida Paulista, São Paulo/SP
- `20040-020` - Centro, Rio de Janeiro/RJ
- `30130-100` - Centro, Belo Horizonte/MG
- `40020-000` - Centro, Salvador/BA

## 🌐 API Utilizada

O aplicativo utiliza a [ViaCEP API](https://viacep.com.br/), uma API REST gratuita e sem necessidade de autenticação.

**Endpoint utilizado:**
```
GET https://viacep.com.br/ws/{cep}/json/
```

**Resposta de sucesso:**
```json
{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "de 612 a 1510 - lado par",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

## 🏗️ Estrutura do Projeto

```
viaCep-api/
├── assets/              # Recursos do aplicativo (ícones, imagens)
├── App.js              # Componente principal do aplicativo
├── index.js            # Ponto de entrada do Expo
├── app.json            # Configurações do Expo
├── package.json        # Dependências e scripts
└── README.md           # Documentação do projeto
```

## 💡 Conceitos Aplicados

- **Componentes Funcionais**: Uso de function components
- **Hooks do React**:
  - `useState`: Gerenciamento de estado
  - Validação e formatação de dados
- **Requisições HTTP**: Uso do Axios para comunicação com API
- **Tratamento de Erros**: Try/catch e mensagens de erro
- **UX/UI**: Feedback visual com loading e mensagens
- **Validação de Formulários**: Validação de CEP
- **Responsive Design**: Layout adaptável

## 🎨 Recursos de Interface

- Design moderno e limpo
- Cores intuitivas (azul para buscar, cinza para limpar, vermelho para erros)
- Feedback visual durante carregamento
- Mensagens de erro amigáveis
- Layout responsivo com ScrollView
- Sombras e elevações para profundidade
- Formatação automática do CEP

## 🛠️ Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no Android
npm run ios        # Executa no iOS (apenas macOS)
npm run web        # Executa no navegador
```

## ⚠️ Tratamento de Erros

O aplicativo trata os seguintes cenários:

1. **CEP inválido**: Menos de 8 dígitos
2. **CEP não encontrado**: API retorna erro
3. **Falha de conexão**: Erro de rede ou API indisponível
4. **Validação de entrada**: Aceita apenas números

## 📝 Melhorias Futuras

- [ ] Histórico de consultas
- [ ] Favoritos
- [ ] Compartilhamento de endereços
- [ ] Modo escuro
- [ ] Busca reversa (por endereço)
- [ ] Integração com mapas
- [ ] Cache de consultas

## 👨‍💻 Autor

**Renan Rocha**
- Projeto desenvolvido para a disciplina de Desenvolvimento para Dispositivos Móveis
- 6º Período

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

## 🙏 Agradecimentos

- [ViaCEP](https://viacep.com.br/) pela API gratuita
- [Expo](https://expo.dev/) pela plataforma de desenvolvimento
- [React Native](https://reactnative.dev/) pela documentação

---

⭐ Desenvolvido com React Native e ❤️
