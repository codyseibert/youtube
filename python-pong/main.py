import pygame
from pygame.locals import *
from paddle import Paddle
from ball import Ball
from inputs import handle_events, handle_input
from constants import SCREEN_WIDTH, SCREEN_HEIGHT, WHITE, RED

ball = None
left_paddle = None
right_paddle = None

pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Python PONG")

clock = pygame.time.Clock()

done = [False]

is_game_over = [False]


def setup_game():
    global ball
    global left_paddle
    global right_paddle
    ball = Ball((SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
    left_paddle = Paddle()
    right_paddle = Paddle()
    right_paddle.rect.x = SCREEN_WIDTH - right_paddle.rect.width


def draw_game_over():
    font = pygame.font.Font("freesansbold.ttf", 32)
    game_over = font.render("GAME OVER", True, RED)
    game_over_rect = game_over.get_rect()
    game_over_rect.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
    screen.blit(game_over, game_over_rect)


def draw_game():
    left_paddle.draw(screen)
    right_paddle.draw(screen)
    ball.draw(screen)


def draw():
    screen.fill(WHITE)

    if is_game_over[0]:
        draw_game_over()
    else:
        draw_game()

    pygame.display.flip()


def update():
    handle_events(done)
    if not is_game_over[0]:
        handle_input(left_paddle, right_paddle)
        ball.update(left_paddle, right_paddle, is_game_over)


setup_game()
while not done[0]:
    clock.tick(30)
    update()
    draw()


pygame.quit()
