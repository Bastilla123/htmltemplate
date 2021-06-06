from django.db import models


class Flags(models.Model):
    name = models.CharField(max_length=2000, default="", blank=False, null=False)


class Attachment(models.Model):
    filename = models.CharField(max_length=2000, default="", blank=False, null=False)
    content_type = models.CharField(max_length=2000, default="", blank=False, null=False)


class Emails(models.Model):
    uid = models.PositiveIntegerField(default=1)

    subject = models.CharField(max_length=240, default="", blank=False, null=False)

    from_address = models.CharField(max_length=255, default="", blank=False, null=False)
    to_values = models.CharField(max_length=2000, default="", blank=False, null=False)
    cc_values = models.CharField(max_length=2000, default="", blank=True, null=True)
    bcc_values = models.CharField(max_length=2000, default="", blank=True, null=True)
    reply_to_values = models.CharField(max_length=2000, default="", blank=True, null=True)
    date = models.DateTimeField(auto_now=True)
    text_message = models.TextField(blank=True, default="", null=True)
    html_message = models.TextField(blank=True, default="", null=True)
    flags = models.CharField(max_length=240, default="", blank=True, null=True)
    header = models.TextField(max_length=2000, default="", blank=False, null=False)
    folder = models.CharField(max_length=2000, default="", blank=True, null=True)
    attachments = models.ManyToManyField('Attachment')
    is_hide = models.BooleanField(default=False)
    mailbox = models.CharField(max_length=240, default="", blank=False, null=False)
    trash = models.BooleanField(default=False)
