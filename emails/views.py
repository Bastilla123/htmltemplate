from django.shortcuts import render

def viewpage(request):
    return render(request, 'emailpage.html')
