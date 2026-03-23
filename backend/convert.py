import cv2
import os

image_folder = r"C:\Users\haris\Downloads\VisDrone2019-VID-test-dev\sequences\uav0000355_00001_v"
video_name = r"C:\Users\haris\Downloads\output1.mp4"

images = sorted([img for img in os.listdir(image_folder) if img.endswith(".jpg")])

first_frame = cv2.imread(os.path.join(image_folder, images[0]))
height, width, _ = first_frame.shape

video = cv2.VideoWriter(
    video_name,
    cv2.VideoWriter_fourcc(*'mp4v'),
    30,
    (width, height)
)

for image in images:
    img_path = os.path.join(image_folder, image)
    frame = cv2.imread(img_path)
    video.write(frame)

video.release()

print("✅ Video created:", video_name)