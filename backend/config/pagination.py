from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class BasicPagination(PageNumberPagination):
    page_size = 20
    page_query_param = 'page'

    def get_paginated_response(self, data):
        if self.page.number == 1:
            return Response({
                'page': self.page.paginator.num_pages,
                'count': self.page.paginator.count,
                'data': data
            })
        else:
            return Response({
                'data': data
            })
