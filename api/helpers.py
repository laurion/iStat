def get_ip_from_request(request):
    return request.META['REMOTE_ADDR']