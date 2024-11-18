from sqlalchemy.orm import Session

from app.core.db import session

from fastapi import Depends


def get_session() -> Session:
    return session()


def get_auth_token(request) -> str:
    return request.headers.get("Authorization")[7:]


# verify_token = FirebaseHTTPBearer()
# authorization = AuthorizationCheck()
#
# dependencies = [Depends(verify_token)]
