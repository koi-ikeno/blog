---
title: "Spectrasonics Omnisphere 2 waveform error? Check file corruption!"
description: "I investigated what was going on and found some data corruption, so I am leaving this as a reminder."
pubDate: "Sep 11 2022"
heroImage: "../../../public/post_img.webp"
---
Omnisphere is a very popular sound source plugin for DTM.
You've installed Omnisphere on your storage device, but it's sounding weird.
The sound is strange. Noisy, choppy, and some tones fail to load.
I investigated what was going on and found some data corruption, so I am leaving this as a reminder.
<h2>Check for broken files</h2>
Check the contents of the STEAM folder and force open a .db file with a text editor.
For example, Phrases 01.db will be easy to check because of its relatively small file size (428MB).
It is located at the following path
\STEAM\Omnisphere\Soundsources\Factory\Core Library\Phrases\Phrases 01.db

Some of the other files are large, so you will need to use a text editor that supports large files.
<h3>Structure of the db file</h3>
in a .db file, The &lt;FILE&gt;&lt;DIR&gt; tag is used at the beginning.
This contains the xml file for the patch description and the location of the wave data.
The latter part contains the wave data. This part is not in a human-readable format.

If you look around the &lt;FILE&gt;&lt;DIR&gt; tag.
you will find a part where the characters are unnaturally garbled.


This means that the data is corrupted.
To resolve the Omnisphere error, we can simply re-copy these corrupted .db files from the USB device used for installation.
<h2>Download from official site for reinstallation</h2>
However, at the time of loading from the USB device, You may see these files already broken.
(This can be found by checking the db file in the USB device).

In that case, You can re-download the software data from the official Spectrasonics website and re-install Omnisphere. But It takes additional cost for this service.
If the data on the USB device is safe, this is a cost you do not have to pay.
So, I suggest you use the check method I introduced to determine if you have to download the software directly.

Omnisphere is a masterpiece sound source that even Billy Irish's brother loves to use, I think it is good to consider the stress of this kind of work as a necessary cost, and make full use of it.

Happy Music Life!