ABI Shortcuts
=============

This little project is a Google Chrome extension with a few commands activated by keyboard shortcuts.

Now it contains only three commands (translate, bookmark, shorturl),
but it will grow with my needs to automate more operations.

I guess it will be more useful as a base code for other developers, not as a finished product,
so I will not publish it on Chrome Web Store.


list of commands:
-----------------

*   __Translate__ _(default key: Ctrl+Shift+A)_

    Takes the text selected on active tab, and opens a Google Translator in a new tab, with this text entered for translation.

*   __Bookmark__ _(default key: Ctrl+Shift+X)_

    It is useful if you have too much tabs open (again). It just adds all inactive tabs to your bookmark bar, and then closes them all.
    It leaves the active tab untouched.

*   __ShortURL__ _(default key: Ctrl+Shift+S)_

    It is useful if you want to write somewhere an URL address to active page, but it is too long.
    It uses Google URL Shortener API to create new short URL (like: `goo.gl/ABCDE`) that leads to the same page the long URL does.
    Check the [Google URL Shortener API documentation](http://goo.gl/bgD0D2) for more info.


If some shortcut does nothing at all, check the [chrome://extensions](chrome://extensions) page.
At the bottom of this page there is a link to keyboard shortcuts settings...



