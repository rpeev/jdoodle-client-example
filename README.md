# JDoodle API Client Example

JavaScript JDoodle API Client Example

```bash
git clone https://github.com/rpeev/jdoodle-client-example.git
cd jdoodle-client-example/
cp template.env .env
# Edit .env to tweak the HOST and PORT values and to set
# JDOODLE_CLIENT_XXX credentials (if you don't the example will
# still run but the endpoints will respond with `Unauthorized Request`)
npm install
npm start # Ctrl-C to stop
# Or run under pm2 watching for file changes
# npm run pm:start
```
