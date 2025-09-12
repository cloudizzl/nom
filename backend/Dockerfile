FROM alpine:3.18

# Install dependencies
RUN apk add --no-cache \
    wget \
    unzip \
    ca-certificates \
    tzdata

# Create non-root user
RUN addgroup -S pocketbase && \
    adduser -S pocketbase -G pocketbase

# Download and install PocketBase
ARG PB_VERSION=0.22.4
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip -O /tmp/pb.zip && \
    unzip /tmp/pb.zip -d /usr/local/bin/ && \
    rm /tmp/pb.zip && \
    chmod +x /usr/local/bin/pocketbase

# Create data directory and set permissions
RUN mkdir -p /data && \
    chown -R pocketbase:pocketbase /data && \
    chmod 755 /data

# Switch to non-root user
USER pocketbase

# Expose the port PocketBase runs on
EXPOSE 8090

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8090/api/health || exit 1

# Start PocketBase
ENTRYPOINT ["pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/data"]