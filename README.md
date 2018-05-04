# README #

### What is this repository for? ###

* First of all, this is part of my **personal trinkets**, if you can benefit from it, go ahead!
* My current goal is to have my main computer **without Xorg**, yikes!
* The first problem with such system is, How do I google something up? Or even browse the web?
> Should I use lynx, maybe w3m? Nah, at least not for general purpose browsing.
* So why not use my phone for that, or maybe the tablet?
> My workflow could be, grab the phone, unlock, type the query... umm too slow
* So that's why I'm building this little utility. I would absolutely love to simply type a command, and boom! the tablet automatically loads the page!
* Now if I couple it with a "bluetooth keyboard" emulator, it could be **even more** interesting....

### How does it work?

* It relies on the fact that "named" popups, can still be redirected to a different url by the opener.
* As it is a popup, it requires the initial "user event" (touch), to be able to open it
* It also relies on the browser not "killing" the background control page (seems to work great on either iOS or Android)

### How do I get set up? ###

* Install node
* `git clone https://bitbucket.org/ocampos/noxquest_url-opener.git`
* `cd noxquest_url-opener`
> The next step is my approach to register some aliases, and add it to .bashrc (I would advise reviewing it)
* `source register-alias.sh`
* `nohup node server.js &`
* Now on your tablet or phone, open http:// <ip address of nox system> :20000
* Touch anywhere on the screen to open a "popup" (this is the window that can be controlled from console)
* Now its all set! Use any of the aliases you registered. For example, type in command line, "google" and it will prompt you for the query (it uses history too! so you can benefit from C-r, or up/down arrows)

If your WebSocket is killed on the "control" page, just go to that tab, and touch it again. :)

### TODO ###

* Add some security (at least some credentials), and might be worth considering https
* I'm planning to "tunnel" some images from my conosle to the mobile device
* Analyze the activity log