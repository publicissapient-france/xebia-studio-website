#!/usr/bin/env python
print 'Content-Type: text/xml'
print 
import urllib2,cgi
form = cgi.FieldStorage()
url = form.getfirst('url', 'empty')
feed = urllib2.urlopen(url).read()
print feed