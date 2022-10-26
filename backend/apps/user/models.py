from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

import datetime
import uuid


class UserManager(BaseUserManager):

    def create_user(self, uid, email, mailing, message, name=None, nickname=None, contact=None, residence=None, homepage=None,
                    blog=None, birth=None, job=None, profile=None, social=None, password=None):
        user = self.model(
            uid=uid, name=name, nickname=nickname, email=UserManager.normalize_email(email), contact=contact,
            residence=residence, homepage=homepage, blog=blog, birth=birth, job=job, profile=profile, social=social,
            mailing=mailing, message=message, sign_in=datetime.datetime.now(), sign_out=None
        )
        if social:
            user.is_active = False
        else:
            user.is_active = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, uid, name, nickname, email, mailing, message, contact, residence, homepage,
                         blog, birth, job, profile, social, password):
        user = self.create_user(
            uid=uid, name=name, nickname=nickname, email=UserManager.normalize_email(email), contact=contact,
            residence=residence, homepage=homepage, blog=blog, birth=birth, job=job, profile=profile, social=social,
            mailing=mailing, message=message, password=password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def image_path(instance, filename):
    extension = filename.split('.')[-1]
    return f'{instance.id}.{extension}'


MESSAGE_PERMIT = [
    ('OPN', 'allow all'),
    ('LMT', 'friend only'),
    ('CLS', 'disallow')
]


class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4)
    uid = models.CharField(max_length=15, unique=True, null=True)
    name = models.CharField(max_length=16, null=True)
    nickname = models.CharField(max_length=8, null=True)
    email = models.EmailField(verbose_name='email', max_length=50, unique=True, null=True)
    contact = models.CharField(max_length=15, null=True)
    residence = models.CharField(max_length=10, null=True)
    homepage = models.URLField(null=True)
    blog = models.URLField(null=True)
    birth = models.DateField(null=True)
    job = models.CharField(max_length=10, null=True)
    profile = models.ImageField(upload_to=image_path, null=True)
    social = models.CharField(max_length=6, null=True)
    mailing = models.BooleanField(default=False)
    message = models.CharField(max_length=3, choices=MESSAGE_PERMIT, default='ALL')
    sign_in = models.DateField(auto_now_add=True)
    sign_out = models.DateField(null=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'uid'
    REQUIRED_FIELDS = [
        'name', 'nickname', 'email', 'contact', 'residence', 'homepage', 'blog', 'job', 'profile', 'social',
        'mailing', 'message', 'sign_in', 'sign_out'
    ]

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin

    def save(self, *args, **kwargs):
        if self.id is None:
            temp = self.profile
            self.profile = None
            super().save(*args, **kwargs)
            self.profile = temp
        super().save(*args, **kwargs)

