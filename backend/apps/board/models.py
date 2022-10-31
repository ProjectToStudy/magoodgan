from django.db import models

from apps.user.models import User


def file_path(instance, filename):
    return f'notice/{instance.notice.id}/{filename}'


class NoticeBoard(models.Model):
    title = models.CharField(max_length=30)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    view = models.IntegerField(default=0)

    class Meta:
        db_table = 'notice_board'


class NoticeBoardFile(models.Model):
    notice = models.ForeignKey(NoticeBoard, on_delete=models.CASCADE)
    file = models.FileField(upload_to=file_path)

    class Meta:
        db_table = 'notice_board_file'
