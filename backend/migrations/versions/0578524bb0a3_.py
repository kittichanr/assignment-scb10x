"""empty message

Revision ID: 0578524bb0a3
Revises: 43e7012d8c0c
Create Date: 2025-03-03 17:46:54.852097

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0578524bb0a3'
down_revision = '43e7012d8c0c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.add_column(sa.Column('response_time', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.drop_column('response_time')

    # ### end Alembic commands ###
