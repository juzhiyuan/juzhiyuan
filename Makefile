themeDir=./themes/
source=.

.PHONY: dev, build, clean

dev:
	-rm -r ./resources
	hugo server -D -s $(source) --themesDir $(themeDir) --disableFastRender

build:
	mv ./static/favicon.ico ./themes/minima/static/favicon.ico
	hugo -D --gc --minify -s $(source) --themesDir $(themeDir)

clean:
	rm -r $(source)/public
