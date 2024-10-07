# AppDoacao

Plataforma WEB para gestão e divulgação de campanhas de doação e eventos beneficentes

IFSC - Câmpus Tubarão
Acadêmicos:
 - Douglas Guimarães dos Santos
 - João Pedro Barreto Maximiano

Orientador:
 - Edjandir Corrêa Costa

Para configurar a plataforma, basta clonar o projeto e executar estes comandos no diretório raíz do projeto (apenas uma vez é o suficiente):

- Configurar o link das imagens do projeto
```
php artisan storage:link
```

- Criar as tabelas no banco (MySQL precisa estar em execução) 
```
php artisan migrate
```

- Atualizar as dependencias:
```
npm i
```

Para executar iniciar o projeto, basta rodar os seguintes comandos no diretório raíz do projeto, em dois terminais diferentes:
```
php artisan serve
```
```
npm run dev
```
