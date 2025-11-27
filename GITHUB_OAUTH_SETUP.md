# Configuration GitHub OAuth pour Supabase

Pour activer l'authentification GitHub sur votre projet Supabase, suivez ces étapes précises :

## 1. Créer une OAuth App sur GitHub

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers).
2. Cliquez sur **"New OAuth App"**.
3. Remplissez le formulaire :
   - **Application Name** : `NIDY` (ou le nom de votre choix)
   - **Homepage URL** : `http://localhost:3000` (pour le développement local)
   - **Authorization callback URL** : `https://jlnbrifyikhczrcnhxff.supabase.co/auth/v1/callback`
     *(Ceci est l'URL de votre projet Supabase + `/auth/v1/callback`)*

4. Cliquez sur **"Register application"**.
5. Notez le **Client ID**.
6. Cliquez sur **"Generate a new client secret"** et copiez le **Client Secret**.

## 2. Configurer Supabase

1. Allez sur votre [Dashboard Supabase](https://supabase.com/dashboard/project/jlnbrifyikhczrcnhxff).
2. Dans le menu de gauche, cliquez sur **Authentication** > **Providers**.
3. Trouvez **GitHub** dans la liste et cliquez dessus pour dérouler les options.
4. Activez le switch **"Enable GitHub"**.
5. Collez le **Client ID** copié depuis GitHub.
6. Collez le **Client Secret** copié depuis GitHub.
7. Cliquez sur **Save**.

## 3. Tester

Une fois configuré, vous pourrez utiliser la méthode `signInWithOAuth` dans votre application :

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: 'http://localhost:3000/auth/callback',
  },
})
```
