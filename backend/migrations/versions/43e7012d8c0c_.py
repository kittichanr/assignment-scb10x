"""empty message

Revision ID: 43e7012d8c0c
Revises: 41d60aa20221
Create Date: 2025-03-03 08:19:52.202023

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '43e7012d8c0c'
down_revision = '41d60aa20221'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chat_session',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updated', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('message',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('session_id', sa.String(), nullable=False),
    sa.Column('role', sa.Enum('user', 'assistant', name='role_enum'), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('created', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updated', sa.DateTime(timezone=True), nullable=True),
    sa.Column('like_status', sa.Enum('like', 'dislike', 'none', name='like_enum'), nullable=True),
    sa.ForeignKeyConstraint(['session_id'], ['chat_session.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('message')
    op.drop_table('chat_session')
    # ### end Alembic commands ###
