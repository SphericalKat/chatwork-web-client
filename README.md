# Chatwork Web Client
### Getting started
#### Running the project
* Install dependencies with `pnpm install`
* Run migrations with `pnpm run db:migrate`
* Put the following in `.env`
```bash
DATABASE_URL=local.db
NEXT_CHATWORK_OAUTH_API_URL='https://oauth.chatwork.com'
NEXT_CHATWORK_API_URL='https://api.chatwork.com/v2'
NEXT_CHATWORK_OAUTH_URL="https://www.chatwork.com/packages/oauth2/login.php"

# Values for these 3 are in the next step of this README
NEXT_APP_BASE_URL=''
NEXT_CHATWORK_CLIENT_ID=''
NEXT_CHATWORK_CLIENT_SECRET=''
```
* Run the project with `pnpm run dev`

#### Proxying
Chatwork requires you to be developing on an `https://` url, so localhost will not work.  
The easiest way to do this is to install [Tailscale](https://tailscale.com), and run `tailscale funnel 3000`.  
This will give you a url that it proxied `localhost:3000` to, which will look something like `https://abc.def.ts.net`.  
Now, you can set `NEXT_APP_BASE_URL` in your `.env`:
```bash
NEXT_APP_BASE_URL="https://abc.def.ts.net"
```

#### Creating the Chatwork OAuth app
* Go to Chatwork > Integrations  
  <img width="241" alt="image" src="https://github.com/user-attachments/assets/d728f340-0993-4404-9c02-6c987b07d1cf" />
* Go to API > OAuth  
  <img width="266" alt="image" src="https://github.com/user-attachments/assets/d1ba947c-0aa7-49a4-86ac-dc2a034ce52d" />
* Click 'Create New'  
  <img width="147" alt="image" src="https://github.com/user-attachments/assets/60928e57-88db-47ae-875e-291a4c66bf40" />
* Choose any _Client Name_ and _Client Type_, and check all checkboxes in _Scope_. You don't need to choose an _Icon_.
* For _Redirect URI_, append `/login/chatwork/callback` to the value you set to `NEXT_APP_BASE_URL`, which will look something like `https://abc.def.ts.net/login/chatwork/callback`. Just this one will do for now.  
* Press _Create_ at the bottom of the screen, and you'll get redirected to a screen that will have your Client ID and Client Secret. Set them in your `.env`.  
* Now visit `https://abc.def.ts.net` in your browser, and you should be able to grant access and proceed to the web app with all your chats visible!

