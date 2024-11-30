"""Added User Role

Revision ID: 97edaa108322
Revises: 0c4318976d62
Create Date: 2024-11-30 02:17:21.401030

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '97edaa108322'
down_revision: Union[str, None] = '0c4318976d62'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('organization_name_key', 'organization', type_='unique')
    op.add_column('user', sa.Column('role', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'role')
    op.create_unique_constraint('organization_name_key', 'organization', ['name'])
    # ### end Alembic commands ###