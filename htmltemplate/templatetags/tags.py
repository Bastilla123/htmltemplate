from historie.models import Historie
from django.template import Library
from django.template.defaultfilters import stringfilter
from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe
import re
from django.urls import reverse
import datetime

register = Library()

@register.filter(name='split')
def split(value, key):
    if (value is None or value == ""):
        return ""

    return str(value).split(key)

@stringfilter
def strips(value, autoescape=None):

    return mark_safe(value.strip())
strips.needs_autoescape = True
register.filter(strips)

@register.filter(name='times')
def times(number):

    return range(1,int(number))

@register.filter(name='getmodelfieldtype')
def getmodelfieldtype(fieldname,instance):

    return eval(instance._meta.object_name)._meta.get_field(fieldname).get_internal_type()

@register.filter(name='getmanytomanyvalues')
def getmanytomanyvalues(instance,fieldname):
    #print("Fieldname "+str(fieldname))
    #print("Instance "+str(instance))

    attr = getattr(instance,fieldname).all()

    string = ""
    for items in attr:

        string += '<a href=/edit/'+items.__class__.__name__+'/'+str(items.pk)+' >Link zu '+str(items)+'</a>'


    return string

@register.filter
def get_attr(value, arg):
    try:
        return getattr(value, arg)
    except:
        return

@register.filter
def get_type(value):
    return str(type(value))

@register.filter
def get_item(dictionary,key):


    return dictionary.get(key)

@register.filter
def get_url_from_dict(dictionary):

    refname = dictionary.get('href')
    return refname

@register.filter
def age(bday, d=None):

    if d is None:
        d = datetime.date.today()
    return (d.year - bday.year) - int((d.month, d.day) < (bday.month, bday.day))


@register.filter
def replace(value, arg):
    """
    Replacing filter
    Use `{{ "aaa"|replace:"a|b" }}`
    """
    if len(arg.split('|')) != 2:
        return value

    what, to = arg.split('|')
    return value.replace(what, to)
