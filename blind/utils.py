menu = [
    {'title': "Форум", 'url_name': 'forum'},
    {'title': "Соревнования", 'url_name': 'competition'},
    {'title': "Практика", 'url_name': 'practice'},
    {'title': "Теория", 'url_name': 'theory'},
]


class DataMixin:
    def get_mixin_context(self, context, **kwargs):
        context['menu'] = menu
        context.update(kwargs)
        return context
