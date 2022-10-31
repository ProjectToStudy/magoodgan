from rest_framework import serializers

from apps.board.models import NoticeBoard


class NoticeBoardSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField(read_only=True)
    nickname = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = NoticeBoard
        fields = ('id', 'date', 'title', 'content', 'view', 'nickname', )

    def get_date(self, obj):
        return obj.date.strftime('%Y.%m.%d %H:%M')

    def get_nickname(self, obj):
        return obj.user.nickname
