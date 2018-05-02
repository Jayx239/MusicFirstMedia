all: buildDirectories

.PHONY: buildDirectories

buildDirectories:
	mkdir public/musicfirst \
	public/musicfirst/media \
	public/musicfirst/media/audio \
	public/musicfirst/media/image \
	public/musicfirst/media/video

