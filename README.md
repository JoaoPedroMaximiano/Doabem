# Doabem

Plataforma WEB para gestão e divulgação de campanhas de doação e eventos beneficentes

IFSC - Câmpus Tubarão
Acadêmicos:
 - Douglas Guimarães dos Santos
 - João Pedro Barreto Maximiano

Orientador:
 - Edjandir Corrêa Costa

## Configuração do ambiente

Para configurar a plataforma, basta clonar o projeto e executar os comandos abaixo no diretório raiz.

### 1. Instalar as dependências

Instale as dependências do PHP e do JavaScript:

```bash
composer install
npm install
```

### 2. Configurar o ambiente

Crie o arquivo `.env` a partir do exemplo:

```
cp .env.example .env
```

Configure as variáveis de ambiente conforme necessário.

### 3. Iniciar os containers Docker

Inicie o ambiente utilizando o Laravel Sail:

```
./vendor/bin/sail up -d
```

### 4. Configuração inicial

Execute os comandos abaixo para concluir a configuração da aplicação:

- Gerar a chave da aplicação:

```
./vendor/bin/sail artisan key:generate
```

- Configurar o link das imagens do projeto:

```
./vendor/bin/sail artisan storage:link
```

- Criar as tabelas no banco de dados:

```
./vendor/bin/sail artisan migrate
```

### Executando o projeto

Com os containers em execução, inicie o servidor de desenvolvimento do frontend:

```
./vendor/bin/sail npm run dev
```

A aplicação estará disponível no endereço configurado no ambiente Docker, normalmente:

```
http://localhost
```

Para encerrar os containers:

```
./vendor/bin/sail down
```
