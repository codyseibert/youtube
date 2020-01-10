import pygame
from constants import *


class Ball:
    def __init__(self, position):
        self.vx = 5
        self.vy = 5
        self.x = position[0]
        self.y = position[1]
        self.radius = 10

    def get_rect(self):
        return pygame.Rect(
            self.x - self.radius, self.y - self.radius, self.radius * 2, self.radius * 2
        )

    def move(self):
        self.x += self.vx
        self.y += self.vy

    def handle_collisions(self, left_paddle, right_paddle, is_game_over):
        if self.x > SCREEN_WIDTH - self.radius // 2 or self.x < self.radius // 2:
            is_game_over[0] = True

        if self.y > SCREEN_HEIGHT - self.radius // 2 or self.y < self.radius // 2:
            self.vy *= -1

        if self.get_rect().colliderect(left_paddle.rect) or self.get_rect().colliderect(
            right_paddle.rect
        ):
            self.vx *= -1

    def update(self, left_paddle, right_paddle, is_game_over):
        self.move()
        self.handle_collisions(left_paddle, right_paddle, is_game_over)

    def draw(self, screen):
        pygame.draw.circle(screen, RED, (self.x, self.y), self.radius)

