"""empty message

Revision ID: 67af8718c37c
Revises: 29ea83d13af8
Create Date: 2019-01-22 22:56:43.926997

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '67af8718c37c'
down_revision = '29ea83d13af8'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('game', 'time_played')
    op.add_column('game', sa.Column('time_played', sa.DateTime(), nullable=True))


def downgrade():
    op.drop_column('game', 'time_played')
    op.add_column('game', sa.Column('time_played', sa.Integer(), nullable=True))
