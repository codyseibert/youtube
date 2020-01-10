import pygame
from pygame.locals import *


def handle_events(done):
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done[0] = True


def handle_input(left_paddle, right_paddle):
    pygame.event.pump()
    keys = pygame.key.get_pressed()

    if keys[K_w]:
        left_paddle.move_up()
    elif keys[K_s]:
        left_paddle.move_down()

    if keys[K_UP]:
        right_paddle.move_up()
    elif keys[K_DOWN]:
        right_paddle.move_down()

    if keys[K_ESCAPE]:
        done[0] = True
