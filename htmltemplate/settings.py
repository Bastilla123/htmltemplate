"""
Django settings for emailmarketing project.

Generated by 'django-admin startproject' using Django 3.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os




# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '1l*+v&1vb@-cx*^7l$^rsee#_v@$x2c5wj83y8cal5_v*^3ksh'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['beelze-solutions.de','127.0.0.1']

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    },

}
from django.contrib.messages import constants as messages
MESSAGE_TAGS = {'message_constants.DEBUG': 'debug',
                'message_constants.INFO': 'info',
                'message_constants.SUCCESS': 'success',
                'message_constants.WARNING': 'warning',
                'message_constants.ERROR': 'danger'}


# Application definition

INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'emails',

]
USE_L10N = False

DATE_INPUT_FORMATS = (
    '%Y-%m-%d', '%m/%d/%Y', '%m/%d/%y', # '2006-10-25', '10/25/2006', '10/25/06'
    '%b %d %Y', '%b %d, %Y',            # 'Oct 25 2006', 'Oct 25, 2006'
    '%d %b %Y', '%d %b, %Y',            # '25 Oct 2006', '25 Oct, 2006'
    '%B %d %Y', '%B %d, %Y',            # 'October 25 2006', 'October 25, 2006'
    '%d %B %Y', '%d %B, %Y',            # '25 October 2006', '25 October, 2006'
    '%d.%m.%Y',
)

DATETIME_INPUT_FORMATS = (
    '%Y-%m-%d %H:%M:%S',     # '2006-10-25 14:30:59'
    '%Y-%m-%d %H:%M:%S.%f',  # '2006-10-25 14:30:59.000200'
    '%Y-%m-%d %H:%M',        # '2006-10-25 14:30'
    '%Y-%m-%d',              # '2006-10-25'
    '%m/%d/%Y %H:%M:%S',     # '10/25/2006 14:30:59'
    '%m/%d/%Y %H:%M:%S.%f',  # '10/25/2006 14:30:59.000200'
    '%m/%d/%Y %H:%M',        # '10/25/2006 14:30'
    '%m/%d/%Y',              # '10/25/2006'
    '%m/%d/%y %H:%M:%S',     # '10/25/06 14:30:59'
    '%m/%d/%y %H:%M:%S.%f',  # '10/25/06 14:30:59.000200'
    '%m/%d/%y %H:%M',        # '10/25/06 14:30'
    '%m/%d/%y',              # '10/25/06'
    '%d.%m.%Y %H:%M',
    '%d.%m.%Y'
)

DATE_FORMAT = '%d.%m.%Y'
DATETIME_FORMAT = '%d.%m.%Y %H:%M'

AUTHENTICATION_BACKENDS = (

    'django.contrib.auth.backends.ModelBackend',
)
USE_TZ = True
SITE_URL = "https://beelze-solutions.de"

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',




]

ROOT_URLCONF = 'htmltemplate.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],

        },
    },
]

WSGI_APPLICATION = 'htmltemplate.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

#DATABASES = {
#    "default": {
#        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
#        "NAME": os.environ.get("POSTGRES_DB", os.path.join(BASE_DIR, "db.sqlite3")),
#        "USER": os.environ.get("POSTGRES_USER", "user"),
#        "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "password"),
#        "HOST": os.environ.get("SQL_HOST", "localhost"),
#        "PORT": os.environ.get("SQL_PORT", "5432"),
#    }
#}

DATABASES = {

    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'testtemplate',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'de-de'

TIME_ZONE = 'UTC'

USE_I18N = True



USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = '/var/www/static'
#STATIC_ROOT = os.path.join(BASE_DIR, 'static')
#STATIC_ROOT = os.path.join(BASE_DIR, 'static')
#STATICFILES_DIRS = (os.path.join(BASE_DIR, "emailmarketing"),)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),

]
STATICFILES_FINDERS = ("django.contrib.staticfiles.finders.FileSystemFinder",)

RECAPTCHA_PUBLIC_KEY = ['os.environ.get("RECAPTCHA_PUBLIC_KEY", "")']
RECAPTCHA_PRIVATE_KEY = ['os.environ.get("RECAPTCHA_PRIVATE_KEY", "")']


MEDIA_URL = "/mediafiles/"

MEDIA_ROOT = '/var/www/media'


MAX_UPLOAD_SIZE = "2621440"

EMAIL_USE_TLS = True
EMAIL_HOST = '127.0.0.1'

LOGIN_URL = "login"
LOGOUT_URL = "signout"

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.core.context_processors.request",
)


FIRST_DAY_OF_WEEK = 1 # Monday

#Helpdesk

HELPDESK_DEFAULT_SETTINGS = {
            'use_email_as_submitter': True,
            'email_on_ticket_assign': True,
            'email_on_ticket_change': True,
            'login_view_ticketlist': True,
            'email_on_ticket_apichange': True,
            'preset_replies': True,
            'tickets_per_page': 25
}

# Should the public web portal be enabled?
HELPDESK_PUBLIC_ENABLED = True
HELPDESK_VIEW_A_TICKET_PUBLIC = True
HELPDESK_SUBMIT_A_TICKET_PUBLIC = True

# Should the Knowledgebase be enabled?
HELPDESK_KB_ENABLED = True

# Allow users to change their passwords
HELPDESK_SHOW_CHANGE_PASSWORD = True

# Instead of showing the public web portal first,
# we can instead redirect users straight to the login page.
HELPDESK_REDIRECT_TO_LOGIN_BY_DEFAULT = False

OPTIONS={
    'libraries': {
        'tags': 'emails.templatetags.tags',

        'admin.urls': 'django.contrib.admin.templatetags.admin_urls',
    },
}

CELERY_BROKER_URL = "redis://127.0.0.1:6379/0"
CELERY_RESULT_BACKEND = "redis://127.0.0.1:6379/0"