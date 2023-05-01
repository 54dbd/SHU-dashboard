# Generated by Django 3.2.18 on 2023-05-01 07:24

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('first_name', models.CharField(blank=True, max_length=30, null=True)),
                ('last_name', models.CharField(blank=True, max_length=150, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('dept_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('address', models.CharField(blank=True, max_length=9999, null=True)),
                ('phone', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Major',
            fields=[
                ('major_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('semester_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('credit', models.IntegerField(blank=True, null=True)),
                ('gp_percentage', models.FloatField(blank=True, null=True)),
                ('dept_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.department')),
            ],
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('class_id', models.AutoField(primary_key=True, serialize=False)),
                ('classroom', models.CharField(blank=True, max_length=100, null=True)),
                ('current_selection', models.IntegerField(blank=True, null=True)),
                ('max_selection', models.IntegerField(blank=True, null=True)),
                ('remaining_selection', models.IntegerField(blank=True, null=True)),
                ('time', models.CharField(blank=True, max_length=100, null=True)),
                ('start', models.CharField(blank=True, max_length=100, null=True)),
                ('end', models.CharField(blank=True, max_length=100, null=True)),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.course')),
                ('semester_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.semester')),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='dashboard.user')),
                ('teacher_id', models.CharField(max_length=100, unique=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('dept_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.department')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='dashboard.user')),
                ('student_id', models.CharField(max_length=100, unique=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('gpa', models.FloatField(blank=True, null=True)),
                ('dept_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.department')),
                ('major_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.major')),
            ],
        ),
        migrations.CreateModel(
            name='CourseSelection',
            fields=[
                ('course_selection_id', models.AutoField(primary_key=True, serialize=False)),
                ('gp', models.FloatField(blank=True, null=True)),
                ('exam', models.FloatField(blank=True, null=True)),
                ('grade', models.FloatField(blank=True, null=True)),
                ('can_drop', models.IntegerField(blank=True, null=True)),
                ('class_id', models.ForeignKey(db_column='class_id', on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.class')),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.student')),
            ],
        ),
        migrations.AddField(
            model_name='class',
            name='teacher_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboard.teacher'),
        ),
    ]
