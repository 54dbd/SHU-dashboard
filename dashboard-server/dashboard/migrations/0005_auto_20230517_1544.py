# Generated by Django 3.2.18 on 2023-05-17 07:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0004_alter_student_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={'ordering': ['course_id']},
        ),
        migrations.AlterModelOptions(
            name='courseselection',
            options={'ordering': ['course_selection_id']},
        ),
        migrations.AlterModelOptions(
            name='department',
            options={'ordering': ['dept_id']},
        ),
        migrations.AlterModelOptions(
            name='student',
            options={'ordering': ['user_id']},
        ),
        migrations.AlterModelOptions(
            name='teacher',
            options={'ordering': ['user_id']},
        ),
    ]