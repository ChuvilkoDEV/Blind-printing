from rest_framework import serializers

from blind.models import Theory, TextTemplates


class TheorySerializer(serializers.ModelSerializer):
    title = serializers.CharField(read_only=True)
    slug = serializers.SlugField(read_only=True)
    content = serializers.SerializerMethodField(read_only=True)
    date_of_publication = serializers.DateTimeField(read_only=True)
    image = serializers.CharField(read_only=True)

    class Meta:
        model = Theory
        fields = ['title', 'slug', 'content', 'date_of_publication', 'image']

    def get_content(self, obj):
        return obj.content[:200]


class TextTemplatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextTemplates
        fields = ['id', 'text', 'difficulty', 'character_count']
        extra_kwargs = {
            'character_count': {'default': 0}
        }
