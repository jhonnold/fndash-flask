"""empty message

Revision ID: 29ea83d13af8
Revises: c223a894722e
Create Date: 2019-01-21 21:42:52.742964

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29ea83d13af8'
down_revision = 'c223a894722e'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('game', 'placement', type_=sa.String())

def downgrade():
    op.alter_column('game', 'placement', type_=sa.Integer())
